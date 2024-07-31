// controllers/shipmentController.js
const Shipment = require('../models/Shipment');

// Récupérer toutes les livraisons
exports.getAllShipments = async (req, res) => {
    try {
        const shipments = await Shipment.findAll();
        res.json(shipments);
    } catch (error) {
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des livraisons.' });
    }
};

// Récupérer une livraison par ID
exports.getShipmentById = async (req, res) => {
    try {
        const shipment = await Shipment.findByPk(req.params.id);
        if (!shipment) {
            return res.status(404).json({ error: 'Livraison non trouvée.' });
        }
        res.json(shipment);
    } catch (error) {
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération de la livraison.' });
    }
};

// Créer une nouvelle livraison
// controllers/shipmentController.js

exports.createShipment = async (req, res) => {
    try {
        const { orderId, carrier, trackingNumber, status, currentLocation, estimatedDeliveryDate } = req.body;
        const newShipment = await Shipment.create({
            orderId,
            carrier,
            trackingNumber,
            status,
            currentLocation,
            estimatedDeliveryDate,
        });
        res.status(201).json(newShipment);
    } catch (error) {
        console.error('Erreur lors de la création de la livraison:', error); // Log l'erreur dans la console
        res.status(500).json({ error: 'Une erreur est survenue lors de la création de la livraison.' });
    }
};


// Mettre à jour une livraison
exports.updateShipment = async (req, res) => {
    try {
        const shipment = await Shipment.findByPk(req.params.id);
        if (!shipment) {
            return res.status(404).json({ error: 'Livraison non trouvée.' });
        }

        const { orderId, carrier, trackingNumber, status, currentLocation, estimatedDeliveryDate, actualDeliveryDate } = req.body;

        await shipment.update({
            orderId,
            carrier,
            trackingNumber,
            status,
            currentLocation,
            estimatedDeliveryDate,
            actualDeliveryDate,
        });

        res.json(shipment);
    } catch (error) {
        res.status(500).json({ error: 'Une erreur est survenue lors de la mise à jour de la livraison.' });
    }
};
