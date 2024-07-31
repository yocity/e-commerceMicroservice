// models/Store.js
import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const Store = sequelize.define('Store', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  sellerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  storeName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'stores',
});

export default Store;
