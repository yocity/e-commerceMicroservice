// models/Cart.js
import { DataTypes, Model } from 'sequelize';
import sequelize from '../database.js';

class Cart extends Model {}

Cart.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
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
        modelName: 'Cart',
        tableName: 'Cart',
        timestamps: true, // Assurez-vous que cette option est définie si vous ne voulez pas de colonnes `createdAt` et `updatedAt`
    }
);

export default Cart;