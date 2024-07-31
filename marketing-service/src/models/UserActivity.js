// models/UserActivity.js

import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';
import User from './User.js';

const UserActivity = sequelize.define('UserActivity', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  action: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  action_time: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

UserActivity.belongsTo(User, { foreignKey: 'user_id' });

export default UserActivity;
