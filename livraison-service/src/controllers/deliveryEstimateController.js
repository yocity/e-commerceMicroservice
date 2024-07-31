// controllers/deliveryEstimateController.js
const DeliveryEstimate = require('../models/DeliveryEstimate');

// Récupérer toutes les estimations de délais
exports.getAllEstimates = async (req, res) => {
    try {
        const estimates = await DeliveryEstimate.findAll();
        res.json(estimates);
    } catch (error) {
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des estimations de délais.' });
    }
};

// Récupérer l'estimation par ID de livraison
exports.getEstimateByShipmentId = async (req, res) => {
    try {
        const estimate = await DeliveryEstimate.findOne({ where: { shipmentId: req.params.shipmentId } });
        if (!estimate) {
            return res.status(404).json({ error: 'Estimation de délai non trouvée.' });
        }
        res.json(estimate);
    } catch (error) {
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération de l\'estimation de délai.' });
    }
};

// Créer une nouvelle estimation de délai
exports.createEstimate = async (req, res) => {
    try {
        const { shipmentId, estimatedDeliveryTime } = req.body;
        const newEstimate = await DeliveryEstimate.create({
            shipmentId,
            estimatedDeliveryTime,
        });
        res.status(201).json(newEstimate);
    } catch (error) {
        res.status(500).json({ error: 'Une erreur est survenue lors de la création de l\'estimation de délai.' });
    }
};

// Mettre à jour une estimation de délai
exports.updateEstimate = async (req, res) => {
    try {
        const estimate = await DeliveryEstimate.findOne({ where: { shipmentId: req.params.shipmentId } });
        if (!estimate) {
            return res.status(404).json({ error: 'Estimation de délai non trouvée.' });
        }

        const { estimatedDeliveryTime } = req.body;

        await estimate.update({
            estimatedDeliveryTime,
        });

        res.json(estimate);
    } catch (error) {
        res.status(500).json({ error: 'Une erreur est survenue lors de la mise à jour de l\'estimation de délai.' });
    }
};
