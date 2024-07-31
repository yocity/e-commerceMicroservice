// src/models/Order.js

import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  orderDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  totalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: { // Utilisez 'userId' pour la cohérence
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users', // Assurez-vous que ce nom est correct
      key: 'id',
    },
  },
}, {
  tableName: 'orders',
  timestamps: true,
});

export default Order;
