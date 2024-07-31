// models/DeliveryEstimate.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

class DeliveryEstimate extends Model {}

DeliveryEstimate.init({
    shipmentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Shipments',
            key: 'id'
        }
    },
    estimatedDeliveryTime: {
        type: DataTypes.INTEGER,  // En jours
        allowNull: true,
    }
}, {
    sequelize,
    modelName: 'DeliveryEstimate',
    tableName: 'DeliveryEstimates',
    timestamps: true,
});

module.exports = DeliveryEstimate;
