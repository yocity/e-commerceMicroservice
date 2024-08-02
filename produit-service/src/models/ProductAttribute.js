// models/ProductAttribute.js

import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const ProductAttribute = sequelize.define('ProductAttribute', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  product_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Products',
      key: 'id',
    },
  },
  attribute_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Attributes',
      key: 'id',
    },
  },
  value: {
    type: DataTypes.STRING,
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
  tableName: 'product_attributes',
});

export default ProductAttribute;
