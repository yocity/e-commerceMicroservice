// src/models/index.js

import sequelize from '../config/database.js';
import Product from './Product.js';
import Inventory from './Inventory.js';
import Warehouse from './Warehouse.js';

const db = {
  sequelize,
  Sequelize: sequelize.constructor,
  Product,
  Inventory,
  Warehouse,
};

// Définir les relations
db.Inventory = Inventory;
db.Product = Product;
db.Warehouse = Warehouse;

export default db;
