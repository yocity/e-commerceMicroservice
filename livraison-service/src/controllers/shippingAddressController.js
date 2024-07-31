// controllers/shippingAddressController.js
const ShippingAddress = require('../models/ShippingAddress');

// Récupérer toutes les adresses de livraison
exports.getAllAddresses = async (req, res) => {
    try {
        const addresses = await ShippingAddress.findAll();
        res.json(addresses);
    } catch (error) {
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des adresses de livraison.' });
    }
};

// Récupérer une adresse par ID
exports.getAddressById = async (req, res) => {
    try {
        const address = await ShippingAddress.findByPk(req.params.id);
        if (!address) {
            return res.status(404).json({ error: 'Adresse de livraison non trouvée.' });
        }
        res.json(address);
    } catch (error) {
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération de l\'adresse de livraison.' });
    }
};

// Créer une nouvelle adresse de livraison
exports.createAddress = async (req, res) => {
    try {
        const { userId, addressLine1, addressLine2, city, state, postalCode, country } = req.body;
        const newAddress = await ShippingAddress.create({
            userId,
            addressLine1,
            addressLine2,
            city,
            state,
            postalCode,
            country,
        });
        res.status(201).json(newAddress);
    } catch (error) {
        res.status(500).json({ error: 'Une erreur est survenue lors de la création de l\'adresse de livraison.' });
    }
};

// Mettre à jour une adresse de livraison
exports.updateAddress = async (req, res) => {
    try {
        const address = await ShippingAddress.findByPk(req.params.id);
        if (!address) {
            return res.status(404).json({ error: 'Adresse de livraison non trouvée.' });
        }

        const { addressLine1, addressLine2, city, state, postalCode, country } = req.body;

        await address.update({
            addressLine1,
            addressLine2,
            city,
            state,
            postalCode,
            country,
        });

        res.json(address);
    } catch (error) {
        res.status(500).json({ error: 'Une erreur est survenue lors de la mise à jour de l\'adresse de livraison.' });
    }
};
