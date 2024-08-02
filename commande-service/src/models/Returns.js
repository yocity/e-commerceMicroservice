// models/Returns.js
import { DataTypes, Model } from 'sequelize';
import sequelize from '../database.js';
import Orders from './Orders.js';

class Returns extends Model {}

Returns.init(
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
        reason: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('requested', 'processed', 'completed'),
            defaultValue: 'requested',
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
        modelName: 'Returns',
        tableName: 'Returns',
        timestamps: true,
    }
);

export default Returns;
