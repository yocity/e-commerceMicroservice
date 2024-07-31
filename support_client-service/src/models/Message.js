// models/Message.js
import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';
import User from './User.js';
import Ticket from './Ticket.js';

const Message = sequelize.define('Message', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  ticket_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Ticket,
      key: 'id',
    },
  },
  sender_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
  message_text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  sent_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

Message.belongsTo(Ticket, { foreignKey: 'ticket_id' });
Message.belongsTo(User, { foreignKey: 'sender_id' });

export default Message;
