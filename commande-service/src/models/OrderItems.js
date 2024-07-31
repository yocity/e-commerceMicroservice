// models/OrderItems.js
import { DataTypes, Model } from 'sequelize';
import sequelize from '../database.js';
import Orders from './Orders.js';
import Product from './Product.js';

class OrderItems extends Model {}

OrderItems.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        order_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Orders,
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
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'OrderItems',
        tableName: 'OrderItems',
        timestamps: false,
    }
);

export default OrderItems;
