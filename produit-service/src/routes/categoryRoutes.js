// routes/categoryRoutes.js

import express from 'express';
import {
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
  listCategories,
} from '../controllers/categoryController.js';

const router = express.Router();

// Créer une catégorie
router.post('/', createCategory);

// Obtenir les détails d'une catégorie
router.get('/:id', getCategoryById);

// Mettre à jour une catégorie
router.put('/:id', updateCategory);

// Supprimer une catégorie
router.delete('/:id', deleteCategory);

// Lister toutes les catégories
router.get('/', listCategories);

export default router;
