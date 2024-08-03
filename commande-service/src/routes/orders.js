// routes/orders.js
import express from 'express';
import { Orders, OrderItems, Cart, CartItems } from '../models/index.js';
import { calculateCartTotal } from '../utils/calculateCart.js';

const router = express.Router();

// Créer une nouvelle commande
router.post('/create', async (req, res) => {
    const { userId, couponCode } = req.body;

    try {
        const cart = await Cart.findOne({
            where: { user_id: userId },
            include: [CartItems],
        });

        if (!cart || cart.CartItems.length === 0) {
            return res.status(400).json({ message: 'Le panier est vide' });
        }

        const { totalAmount, tax } = await calculateCartTotal(cart.id);
        let discount = 0;

        if (couponCode) {
            // Logic to apply coupon
            const coupon = await Coupons.findOne({ where: { code: couponCode, is_active: true } });

            if (coupon) {
                discount = (totalAmount * coupon.discount_percentage) / 100;
            }
        }

        const order = await Orders.create({
            user_id: userId,
            total_amount: totalAmount - discount,
            tax,
            discount,
            status: 'pending',
        });

        await Promise.all(
            cart.CartItems.map(async item => {
                await OrderItems.create({
                    order_id: order.id,
                    product_id: item.product_id,
                    quantity: item.quantity,
                    price: item.price,
                });
            })
        );

        // Clear the cart
        await CartItems.destroy({ where: { cart_id: cart.id } });

        res.json({ message: 'Commande créée avec succès', orderId: order.id });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de la commande', error });
    }
});

// Obtenir les commandes d'un utilisateur
router.get('/:userId', async (req, res) => {
    try {
        const orders = await Orders.findAll({
            where: { user_id: req.params.userId },
            include: [OrderItems],
        });

        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des commandes', error });
    }
});

// Obtenir l'historique des commandes d'un utilisateur
router.get('/:userId/history', async (req, res) => {
    try {
        const orders = await Orders.findAll({
            where: { user_id: req.params.userId },
            include: [OrderItems],
            order: [['createdAt', 'DESC']], // Trier les commandes par date de création décroissante
        });

        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération de l\'historique des commandes', error });
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
        res.status(500).json({ message: 'Erreur lors de la mise à jour du statut de la commande', error });
    }
});

export default router;
