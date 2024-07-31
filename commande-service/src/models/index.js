// models/index.js
import Cart from './Cart.js';
import CartItems from './CartItems.js';
import Orders from './Orders.js';
import OrderItems from './OrderItems.js';
import Coupons from './Coupons.js';
import Returns from './Returns.js';
import User from './User.js'; // Assurez-vous que le modèle User existe
import Product from './Product.js'; // Assurez-vous que le modèle Product existe

// Relations Cart - CartItems
Cart.hasMany(CartItems, { foreignKey: 'cart_id' });
CartItems.belongsTo(Cart, { foreignKey: 'cart_id' });

// Relations User - Cart
User.hasOne(Cart, { foreignKey: 'user_id' });
Cart.belongsTo(User, { foreignKey: 'user_id' });

// Relations Orders - OrderItems
Orders.hasMany(OrderItems, { foreignKey: 'order_id' });
OrderItems.belongsTo(Orders, { foreignKey: 'order_id' });

// Relations User - Orders
User.hasMany(Orders, { foreignKey: 'user_id' });
Orders.belongsTo(User, { foreignKey: 'user_id' });

// Relations Product - CartItems
Product.hasMany(CartItems, { foreignKey: 'product_id' });
CartItems.belongsTo(Product, { foreignKey: 'product_id' });

// Relations Product - OrderItems
Product.hasMany(OrderItems, { foreignKey: 'product_id' });
OrderItems.belongsTo(Product, { foreignKey: 'product_id' });

// Relations Orders - Returns
Orders.hasMany(Returns, { foreignKey: 'order_id' });
Returns.belongsTo(Orders, { foreignKey: 'order_id' });

export { Cart, CartItems, Orders, OrderItems, Coupons, Returns, User, Product };
