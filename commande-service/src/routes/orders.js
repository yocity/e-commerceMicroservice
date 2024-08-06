// routes/orders.js

import express from 'express';
import { Orders, OrderItems, Cart, CartItems, Coupons, sequelize } from '../models/index.js';
import { calculateCartTotal } from '../utils/calculateCart.js';
import { sendOrderConfirmationEmail } from '../services/emailService.js'; // Déplacement de la logique d'email à un service séparé
import rateLimit from 'express-rate-limit'; // Limitation de taux pour la sécurité
import { logError, logInfo } from '../utils/logger.js'; // Utilitaire de journalisation

const router = express.Router();

// Limitation de taux pour limiter les requêtes
const createOrderLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limiter chaque IP à 100 requêtes par fenêtre
    message: 'Trop de requêtes, veuillez réessayer plus tard.',
});

// Créer une nouvelle commande et envoyer un email de confirmation
router.post('/create', createOrderLimiter, async (req, res) => {
    const { userId, couponCode } = req.body;

    // Démarrer une transaction de base de données
    const transaction = await sequelize.transaction();
    try {
        const cart = await Cart.findOne({
            where: { user_id: userId },
            include: [{ model: CartItems, as: 'CartItems' }], // Inclure alias d'association
            transaction, // Inclure la transaction
        });

        if (!cart || cart.CartItems.length === 0) {
            return res.status(400).json({ message: 'Le panier est vide' });
        }

        const { totalAmount, tax } = await calculateCartTotal(cart.id);
        let discount = 0;

        if (couponCode) {
            // Logique pour appliquer le coupon
            const coupon = await Coupons.findOne({
                where: { code: couponCode, is_active: true },
                transaction, // Inclure la transaction
            });

            if (coupon) {
                // Vérification de l'expiration du coupon et des limites d'utilisation
                const now = new Date();
                if (coupon.expiry_date && coupon.expiry_date < now) {
                    return res.status(400).json({ message: 'Le coupon a expiré' });
                }

                if (coupon.usage_limit && coupon.usage_count >= coupon.usage_limit) {
                    return res.status(400).json({ message: 'Le coupon a atteint sa limite d\'utilisation' });
                }

                discount = (totalAmount * coupon.discount_percentage) / 100;
                coupon.usage_count += 1;
                await coupon.save({ transaction }); // Sauvegarder avec la transaction
            }
        }

        const order = await Orders.create({
            user_id: userId,
            total_amount: totalAmount - discount,
            tax,
            discount,
            status: 'pending',
        }, { transaction });

        await Promise.all(
            cart.CartItems.map(async (item) => {
                await OrderItems.create({
                    order_id: order.id,
                    product_id: item.product_id,
                    quantity: item.quantity,
                    price: item.price,
                }, { transaction });
            })
        );

        // Effacer le panier
        await CartItems.destroy({ where: { cart_id: cart.id }, transaction });

        // Valider la transaction
        await transaction.commit();

        // Envoyer un email de confirmation de commande en arrière-plan
        sendOrderConfirmationEmail(req.user.email, order.id);

        res.json({ message: 'Commande créée avec succès', orderId: order.id });
    } catch (error) {
        await transaction.rollback();
        logError('Erreur lors de la création de la commande', error);
        res.status(500).json({ message: 'Erreur lors de la création de la commande', error: error.message });
    }
});

// Obtenir les commandes d'un utilisateur
router.get('/:userId', async (req, res) => {
    try {
        const orders = await Orders.findAll({
            where: { user_id: req.params.userId },
            include: [{ model: OrderItems, as: 'OrderItems' }], // Inclure alias d'association
        });

        res.json(orders);
    } catch (error) {
        logError('Erreur lors de la récupération des commandes', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des commandes', error: error.message });
    }
});

// Obtenir l'historique des commandes d'un utilisateur
router.get('/:userId/history', async (req, res) => {
    try {
        const orders = await Orders.findAll({
            where: { user_id: req.params.userId },
            include: [{ model: OrderItems, as: 'OrderItems' }],
            order: [['createdAt', 'DESC']], // Trier les commandes par date de création décroissante
        });

        res.json(orders);
    } catch (error) {
        logError('Erreur lors de la récupération de l\'historique des commandes', error);
        res.status(500).json({ message: 'Erreur lors de la récupération de l\'historique des commandes', error: error.message });
    }
});

// Mettre à jour le statut d'une commande
router.patch('/:orderId/status', async (req, res) => {
    const { status } = req.body;

    try {
        const order = await Orders.findByPk(req.params.orderId);

        if (!order) {
            return res.status(404).json({ message: 'Commande introuvable' });
        }

        order.status = status;
        await order.save();

        res.json({ message: 'Statut de la commande mis à jour avec succès' });
    } catch (error) {
        logError('Erreur lors de la mise à jour du statut de la commande', error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour du statut de la commande', error: error.message });
    }
});

// Suivre le statut d'une commande
router.get('/:orderId/track', async (req, res) => {
    try {
        const order = await Orders.findByPk(req.params.orderId, {
            include: [{ model: OrderItems, as: 'OrderItems' }],
        });

        if (!order) {
            return res.status(404).json({ message: 'Commande introuvable' });
        }

        res.json({
            orderId: order.id,
            status: order.status,
            items: order.OrderItems,
            totalAmount: order.total_amount,
            tax: order.tax,
            discount: order.discount,
        });
    } catch (error) {
        logError('Erreur lors du suivi de la commande', error);
        res.status(500).json({ message: 'Erreur lors du suivi de la commande', error: error.message });
    }
});

// Traitement en lot des commandes (par exemple, mise à jour du statut de plusieurs commandes)
router.patch('/bulk/status', async (req, res) => {
    const { orderIds, status } = req.body;

    try {
        const orders = await Orders.findAll({
            where: { id: orderIds },
        });

        if (orders.length === 0) {
            return res.status(404).json({ message: 'Aucune commande trouvée' });
        }

        await Promise.all(
            orders.map(async (order) => {
                order.status = status;
                await order.save();
            })
        );

        res.json({ message: 'Statut des commandes mis à jour avec succès' });
    } catch (error) {
        logError('Erreur lors de la mise à jour du statut des commandes en lot', error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour du statut des commandes en lot', error: error.message });
    }
});

export default router;
