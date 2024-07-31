// models/SellerPerformance.js
import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const SellerPerformance = sequelize.define('SellerPerformance', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  sellerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalSales: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  averageRating: {
    type: DataTypes.FLOAT,
    defaultValue: 0.0,
  },
  totalReviews: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
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
  tableName: 'seller_performance',
});

export default SellerPerformance;
