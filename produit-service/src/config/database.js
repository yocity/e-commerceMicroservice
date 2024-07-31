// src/config/database.js

import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Charger les variables d'environnement depuis le fichier .env
dotenv.config();

// Créez une instance de Sequelize en spécifiant le dialecte MySQL
const sequelize = new Sequelize(
  process.env.DB_NAME,  // Nom de la base de données
  process.env.DB_USER,  // Utilisateur de la base de données
  process.env.DB_PASSWORD,  // Mot de passe de la base de données
  {
    host: process.env.DB_HOST,  // Hôte de la base de données
    port: process.env.DB_PORT || 3306,  // Port de la base de données
    dialect: 'mysql',  // Spécifiez explicitement le dialecte
    logging: false,  // Désactiver les logs SQL pour plus de clarté
  }
);

export default sequelize;
