// app.js

import express from 'express';
import sequelize from './sequelize.js';
import User from './models/User.js';
import UserActivity from './models/UserActivity.js';
import Campaign from './models/Campaign.js';
import Report from './models/Report.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

// Synchroniser la base de données
sequelize.sync({ force: false }).then(() => {
  console.log('La base de données est synchronisée.');
});

// Route de bienvenue
app.get('/', (req, res) => {
  res.send('Bienvenue au Service de Marketing et d\'Analytique!');
});

// **Gestion des Utilisateurs**

// Créer un nouvel utilisateur
app.post('/users', async (req, res) => {
  try {
    const { username, email } = req.body;
    const user = await User.create({ username, email });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Récupérer tous les utilisateurs
app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// **Suivi des Utilisateurs et Comportements d'Achat**

// Créer une activité utilisateur
app.post('/activities', async (req, res) => {
  try {
    const { user_id, action } = req.body;
    const activity = await UserActivity.create({ user_id, action });
    res.status(201).json(activity);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Récupérer les activités d'un utilisateur spécifique
app.get('/users/:userId/activities', async (req, res) => {
  try {
    const { userId } = req.params;
    const activities = await UserActivity.findAll({ where: { user_id: userId } });
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// **Gestion des Campagnes Marketing**

// Créer une nouvelle campagne
app.post('/campaigns', async (req, res) => {
  try {
    const { name, start_date, end_date, description } = req.body;
    const campaign = await Campaign.create({ name, start_date, end_date, description });
    res.status(201).json(campaign);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Récupérer toutes les campagnes
app.get('/campaigns', async (req, res) => {
  try {
    const campaigns = await Campaign.findAll();
    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// **Rapports et Analyses**

// Créer un nouveau rapport
app.post('/reports', async (req, res) => {
  try {
    const { name, data } = req.body;
    const report = await Report.create({ name, data });
    res.status(201).json(report);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Récupérer tous les rapports
app.get('/reports', async (req, res) => {
  try {
    const reports = await Report.findAll();
    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
