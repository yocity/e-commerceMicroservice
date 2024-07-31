// app.js
import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/database.js';
import warehouseRoutes from './routes/warehouseRoutes.js';
import productRoutes from './routes/productRoutes.js';
import inventoryRoutes from './routes/inventoryRoutes.js';
import db from './models/index.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use('/api/warehouses', warehouseRoutes);
app.use('/api/inventory', inventoryRoutes);

// Synchronisation de la base de données
sequelize
  .authenticate()
  .then(() => {
    console.log('Connexion à la base de données établie avec succès.');
    return sequelize.sync({ force: false });
  })
  .then(() => {
    console.log('Les modèles sont synchronisés avec la base de données.');
    app.listen(PORT, () => {
      console.log(`Le serveur fonctionne sur le port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Impossible de se connecter à la base de données:', error);
  });
