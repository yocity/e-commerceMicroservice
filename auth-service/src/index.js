// src/index.js (ou app.js, si c'est le nom du fichier principal)

import express from 'express';
import userRoutes from './routers/userRoutes.js';  // Assurez-vous que l'extension est incluse
import orderRoutes from './routers/orderRoutes.js';
import wishlistRoutes from './routers/wishlistRoutes.js';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cookieParser()); // Pour lire les cookies

// Routes
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/wishlist', wishlistRoutes);

app.get('/', (req, res) => {
  res.send('Bienvenue sur l\'API!');
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
