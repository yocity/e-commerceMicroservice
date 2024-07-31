// models/ReviewResponse.js
import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const ReviewResponse = sequelize.define('ReviewResponse', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  reviewId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  sellerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  responseText: {
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
  tableName: 'review_responses',
});

export default ReviewResponse;
