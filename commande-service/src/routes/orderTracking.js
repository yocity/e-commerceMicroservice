// routes/orderTracking.js
import express from 'express';
import { Orders } from '../models/index.js';

const router = express.Router();

// Suivi de commande par ID de commande
router.get('/:orderId', async (req, res) => {
    try {
        const order = await Orders.findByPk(req.params.orderId);

        if (!order) {
            return res.status(404).json({ message: 'Commande introuvable' });
        }

        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors du suivi de la commande', error });
    }
});

export default router;
