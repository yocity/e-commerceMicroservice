// models/Report.js

import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';

const Report = sequelize.define('Report', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  data: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

export default Report;
