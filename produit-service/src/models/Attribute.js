// src/models/Attribute.js

import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Attribute = sequelize.define('Attribute', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'attributes',
  timestamps: false,
});

export default Attribute;
