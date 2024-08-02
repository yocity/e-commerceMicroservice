// models/CartItems.js
import { DataTypes, Model } from 'sequelize';
import sequelize from '../database.js';
import Cart from './Cart.js';
import Product from './Product.js';

class CartItems extends Model {}

CartItems.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        cart_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Cart,
                key: 'id',
            },
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Product,
                key: 'id',
            },
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        archive: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        softDelete: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        sequelize,
        tableName: 'Cartitems',
        timestamps: true,
    }
);

export default CartItems;
