// routes/sellers.js
import express from 'express';
import {
  registerSeller,
  getSellerById,
  createStore,
  getStoreBySeller,
  trackSellerPerformance,
} from '../controllers/sellerController.js';

const router = express.Router();

// Enregistrer un nouveau vendeur
router.post('/register', registerSeller);

// Obtenir les informations d'un vendeur
router.get('/:sellerId', getSellerById);

// Créer une nouvelle boutique pour un vendeur
router.post('/:sellerId/stores', createStore);

// Obtenir les informations de la boutique d'un vendeur
router.get('/:sellerId/stores', getStoreBySeller);

// Suivre la performance d'un vendeur
router.get('/:sellerId/performance', trackSellerPerformance);

export default router;
