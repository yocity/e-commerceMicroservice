// src/models/Warehouse.js

import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Warehouse = sequelize.define('Warehouse', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  archive: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  softdelete: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: 'warehouses', // Assurez-vous que le nom correspond à celui utilisé dans votre base de données
  timestamps: true,
});

export default Warehouse;
