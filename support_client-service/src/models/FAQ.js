// models/FAQ.js
import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';

const FAQ = sequelize.define('FAQ', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  question: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  answer: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    onUpdate: DataTypes.NOW,
  },
});

export default FAQ;
