// src/models/Inventory.js

import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Product from './Product.js'; // Assurez-vous que ces importations sont correctes
import Warehouse from './Warehouse.js';

const Inventory = sequelize.define('Inventory', {
  stock_level: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  reorder_threshold: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  archive: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  softDelete: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: 'inventory', // Assurez-vous que le nom correspond à celui utilisé dans votre base de données
  timestamps: true,
});

// Définir les relations
Inventory.belongsTo(Product, {
  foreignKey: 'product_id',
});
Inventory.belongsTo(Warehouse, {
  foreignKey: 'warehouse_id',
});

export default Inventory;
