// src/models/index.js

import sequelize from '../config/database.js';
import Product from './Product.js';
import Category from './Category.js';
import Attribute from './Attribute.js'; // Assurez-vous que l'importation est correcte
import ProductAttribute from './ProductAttribute.js';

// Définition des relations
Category.hasMany(Product, { foreignKey: 'category_id', as: 'products' });
Product.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });

Product.belongsToMany(Attribute, { through: ProductAttribute, foreignKey: 'product_id', as: 'attributes' });
Attribute.belongsToMany(Product, { through: ProductAttribute, foreignKey: 'attribute_id', as: 'products' });

ProductAttribute.belongsTo(Product, { foreignKey: 'product_id' });
ProductAttribute.belongsTo(Attribute, { foreignKey: 'attribute_id' });

// Exportation des modèles
export {
  sequelize,
  Product,
  Category,
  Attribute,  // Assurez-vous que l'exportation est correcte
  ProductAttribute,
};
