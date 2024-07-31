// models/Coupons.js
import { DataTypes, Model } from 'sequelize';
import sequelize from '../database.js';

class Coupons extends Model {}

Coupons.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        code: {
            type: DataTypes.STRING(50),
            unique: true,
            allowNull: false,
        },
        discount_percentage: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: false,
        },
        valid_from: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        valid_until: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    },
    {
        sequelize,
        modelName: 'Coupons',
        tableName: 'Coupons',
        timestamps: false,
    }
);

export default Coupons;
