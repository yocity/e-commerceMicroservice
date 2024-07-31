// routes/reviews.js
import express from 'express';
import {
  createReview,
  getReviews,
  updateReviewStatus,
  respondToReview,
} from '../controllers/reviewController.js';

const router = express.Router();

// Créer un nouvel avis
router.post('/', createReview);

// Obtenir tous les avis pour un produit
router.get('/product/:productId', getReviews);

// Mettre à jour le statut d'un avis (approbation, rejet)
router.patch('/:reviewId/status', updateReviewStatus);

// Répondre à un avis
router.post('/:reviewId/respond', respondToReview);

export default router;
