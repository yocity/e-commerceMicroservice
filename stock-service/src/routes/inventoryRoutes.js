// routes/inventoryRoutes.js
import express from 'express';
import inventoryController from '../controllers/inventoryController.js';

const router = express.Router();

// Ajouter du stock
router.post('/', inventoryController.addStock);

// Récupérer le stock par produit et entrepôt
router.get('/:productId/:warehouseId', inventoryController.getStock);

// Mettre à jour le stock
router.put('/:id', inventoryController.updateStock);

// Supprimer un enregistrement de stock
router.delete('/:id', inventoryController.deleteStock);

export default router;
