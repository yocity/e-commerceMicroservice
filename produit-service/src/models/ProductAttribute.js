// models/ProductAttribute.js

import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const ProductAttribute = sequelize.define('ProductAttribute', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  value: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'product_attributes',
  underscored: true,
});

export default ProductAttribute;
