// routes/warehouseRoutes.js
import express from 'express';
import warehouseController from '../controllers/warehouseController.js';

const router = express.Router();

// Créer un nouvel entrepôt
router.post('/', warehouseController.createWarehouse);

// Récupérer tous les entrepôts
router.get('/', warehouseController.getAllWarehouses);

// Récupérer un entrepôt par ID
router.get('/:id', warehouseController.getWarehouseById);

// Mettre à jour un entrepôt
router.put('/:id', warehouseController.updateWarehouse);

// Supprimer un entrepôt
router.delete('/:id', warehouseController.deleteWarehouse);

export default router;
