// models/Orders.js
import { DataTypes, Model } from 'sequelize';
import sequelize from '../database.js';
import User from './User.js';

class Orders extends Model {}

Orders.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id',
            },
        },
        status: {
            type: DataTypes.ENUM('pending', 'confirmed', 'shipped', 'delivered', 'cancelled', 'returned'),
            defaultValue: 'pending',
        },
        total_amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        tax: {
            type: DataTypes.DECIMAL(10, 2),
            defaultValue: 0,
        },
        discount: {
            type: DataTypes.DECIMAL(10, 2),
            defaultValue: 0,
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
        modelName: 'Orders',
        tableName: 'Orders',
        timestamps: true,
    }
);

export default Orders;
