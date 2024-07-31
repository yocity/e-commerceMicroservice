// routes/searchRoutes.js

import express from 'express';
import { searchProducts, suggestProducts } from '../controllers/searchController.js';

const router = express.Router();

// Route pour rechercher des produits avec filtrage et tri
router.get('/', searchProducts);

// Route pour suggérer des produits basés sur le terme de recherche
router.get('/suggestions', suggestProducts);

export default router;
