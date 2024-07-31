// src/models/index.js

import sequelize from '../config/database.js';
import User from './User.js';
import Order from './Order.js';
import Wishlist from './Wishlist.js';

// Définition des relations

// Relations pour User, Order et Wishlist
User.hasMany(Order, { foreignKey: 'user_id', as: 'orders' });
Order.belongsTo(User, { foreignKey: 'user_id', as: 'users' });

User.hasMany(Wishlist, { foreignKey: 'user_id', as: 'wishlists' });
Wishlist.belongsTo(User, { foreignKey: 'user_id', as: 'users' });

// Exportation des modèles
export {
  sequelize,
  User,
  Order,
  Wishlist,
};
