// routes/productRoutes.js
import express from 'express';
import productController from '../controllers/productController.js';

const router = express.Router();

// Créer un nouveau produit
router.post('/', productController.createProduct);

// Récupérer tous les produits
router.get('/', productController.getAllProducts);

// Récupérer un produit par ID
router.get('/:id', productController.getProductById);

// Mettre à jour un produit
router.put('/:id', productController.updateProduct);

// Supprimer un produit
router.delete('/:id', productController.deleteProduct);

export default router;
