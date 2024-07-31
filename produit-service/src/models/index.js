// models/index.js

import Product from './Product.js';
import Category from './Category.js';
import Attribute from './Attribute.js';
import ProductAttribute from './ProductAttribute.js';

// Définir les relations entre les modèles
Category.hasMany(Product, {
  as: 'products',
  foreignKey: 'category_id',
});
Product.belongsTo(Category, {
  as: 'category',
  foreignKey: 'category_id',
});

Product.belongsToMany(Attribute, {
  through: ProductAttribute,
  as: 'productAttributes', // Assurez-vous que cet alias est unique
  foreignKey: 'product_id',
});
Attribute.belongsToMany(Product, {
  through: ProductAttribute,
  as: 'productAttributes', // Assurez-vous que cet alias est unique et identique à celui de Product
  foreignKey: 'attribute_id',
});

export { Product, Category, Attribute, ProductAttribute };
