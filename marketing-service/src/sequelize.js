// sequelize.js

import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Configuration de la connexion Sequelize
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: false,
});

export default sequelize;
