// routes/cart.js
import express from 'express';
import { Cart, CartItems, Product } from '../models/index.js';

const router = express.Router();

// Obtenir le panier d'un utilisateur
router.get('/:userId', async (req, res) => {
    try {
        const cart = await Cart.findOne({
            where: { user_id: req.params.userId },
            include: [
                {
                    model: CartItems,
                    include: [Product],
                },
            ],
        });

        if (!cart) {
            return res.status(404).json({ message: 'Panier introuvable' });
        }

        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération du panier', error });
    }
});

// Ajouter un produit au panier
router.post('/:userId/add', async (req, res) => {
    const { productId, quantity } = req.body;

    try {
        let cart = await Cart.findOne({ where: { user_id: req.params.userId } });

        if (!cart) {
            cart = await Cart.create({ user_id: req.params.userId });
        }

        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ message: 'Produit introuvable' });
        }

        const cartItem = await CartItems.findOne({
            where: { cart_id: cart.id, product_id: productId },
        });

        if (cartItem) {
            cartItem.quantity += quantity;
            await cartItem.save();
        } else {
            await CartItems.create({
                cart_id: cart.id,
                product_id: productId,
                quantity,
                price: product.price,
            });
        }

        res.json({ message: 'Produit ajouté au panier avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de l\'ajout du produit au panier', error });
    }
});
// Pour tester ce lien avec Postman, assurez-vous d'envoyer une requête POST vers l'URL `/api/cart/:userId/add` avec un corps JSON contenant `productId` et `quantity`. Par exemple, si l'ID de l'utilisateur est 1 et que vous voulez ajouter un produit avec l'ID 2 en quantité de 3, votre corps JSON devrait ressembler à cela : `{ "productId": 2, "quantity": 3 }`.

// Supprimer un produit du panier
router.delete('/:userId/remove/:productId', async (req, res) => {
    try {
        const cart = await Cart.findOne({ where: { user_id: req.params.userId } });

        if (!cart) {
            return res.status(404).json({ message: 'Panier introuvable' });
        }

        await CartItems.destroy({
            where: { cart_id: cart.id, product_id: req.params.productId },
        });

        res.json({ message: 'Produit supprimé du panier avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression du produit du panier', error });
    }
});

// Vider le panier
router.delete('/:userId/clear', async (req, res) => {
    try {
        const cart = await Cart.findOne({ where: { user_id: req.params.userId } });

        if (!cart) {
            return res.status(404).json({ message: 'Panier introuvable' });
        }

        await CartItems.destroy({
            where: { cart_id: cart.id },
        });

        res.json({ message: 'Panier vidé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors du vidage du panier', error });
    }
});

export default router;
