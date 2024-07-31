// routes/returns.js
import express from 'express';
import { Returns, Orders } from '../models/index.js';

const router = express.Router();

// Créer une demande de retour
router.post('/create', async (req, res) => {
    const { orderId, reason } = req.body;

    try {
        const order = await Orders.findByPk(orderId);

        if (!order) {
            return res.status(404).json({ message: 'Commande introuvable' });
        }

        const returnRequest = await Returns.create({
            order_id: orderId,
            reason,
            status: 'requested',
        });

        res.json({ message: 'Demande de retour créée avec succès', returnRequest });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de la demande de retour', error });
    }
});

// Mettre à jour le statut de retour
router.patch('/:returnId/status', async (req, res) => {
    const { status } = req.body;

    try {
        const returnRequest = await Returns.findByPk(req.params.returnId);

        if (!returnRequest) {
            return res.status(404).json({ message: 'Demande de retour introuvable' });
        }

        returnRequest.status = status;
        await returnRequest.save();

        res.json({ message: 'Statut de la demande de retour mis à jour avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour du statut de la demande de retour', error });
    }
});

export default router;
