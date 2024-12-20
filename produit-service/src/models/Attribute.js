// models/Attribute.js

import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Product from './Product.js';
import ProductAttribute from './ProductAttribute.js';

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
  archive: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  softDelete: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});


export default Attribute;
