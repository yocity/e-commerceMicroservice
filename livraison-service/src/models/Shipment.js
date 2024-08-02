// models/Shipment.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database'); // Configuration de votre base de données

class Shipment extends Model {}

Shipment.init({
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    carrier: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    trackingNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('pending', 'in_transit', 'delivered', 'returned'),
        defaultValue: 'pending',
    },
    currentLocation: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    estimatedDeliveryDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    actualDeliveryDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    archive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    softDelete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
}, {
    sequelize,
    modelName: 'Shipment',
    tableName: 'Shipments',
    timestamps: true,
});

module.exports = Shipment;
