// models/ShippingAddress.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

class ShippingAddress extends Model {}

ShippingAddress.init({
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    addressLine1: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    addressLine2: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    postalCode: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'ShippingAddress',
    tableName: 'ShippingAddresses',
    timestamps: true,
});

module.exports = ShippingAddress;
