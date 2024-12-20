// models/Ticket.js
import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';
import User from './User.js';

const Ticket = sequelize.define('Ticket', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('open', 'closed', 'pending'),
    defaultValue: 'open',
  },
  archive: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  softDelete: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    onUpdate: DataTypes.NOW,
  },
});

Ticket.belongsTo(User, { foreignKey: 'user_id' });

export default Ticket;
