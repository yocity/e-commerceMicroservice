// routes/productRoutes.js

import express from 'express';
import {
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  listProducts,
} from '../controllers/productController.js';

const router = express.Router();

// Créer un produit
router.post('/', createProduct);

// Obtenir les détails d'un produit
router.get('/:id', getProductById);

// Mettre à jour un produit
router.put('/:id', updateProduct);

// Supprimer un produit
router.delete('/:id', deleteProduct);

// Lister tous les produits
router.get('/', listProducts);

export default router;
