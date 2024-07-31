// server.js

import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import sequelize from './config/database.js';

import productRoutes from './routes/productRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import attributeRoutes from './routes/attributeRoutes.js';
import searchRoutes from './routes/searchRoutes.js'; // Ajout de la route de recherche

// Charger les variables d'environnement
dotenv.config();

const app = express();

// Utilisation de body-parser pour analyser les requêtes JSON
app.use(bodyParser.json());

// Configuration des routes
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/attributes', attributeRoutes);
app.use('/api/search', searchRoutes); // Ajout de la route de recherche

// Synchronisation avec la base de données
sequelize
  .sync()
  .then(() => {
    console.log('La base de données a été synchronisée.');
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Serveur en cours d'exécution sur le port ${PORT}.`);
    });
  })
  .catch((error) => {
    console.error('Erreur lors de la synchronisation de la base de données :', error);
  });
