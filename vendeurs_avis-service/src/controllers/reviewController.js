// controllers/reviewController.js
import Review from '../models/Review.js';
import ReviewResponse from '../models/ReviewResponse.js';

// Créer un nouvel avis
export const createReview = async (req, res) => {
  try {
    const { productId, userId, rating, comment } = req.body;
    const review = await Review.create({
      productId,
      userId,
      rating,
      comment,
    });
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtenir tous les avis pour un produit
export const getReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.findAll({ where: { productId } });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mettre à jour le statut d'un avis (approbation, rejet)
export const updateReviewStatus = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { status } = req.body;
    const review = await Review.findByPk(reviewId);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    review.status = status;
    await review.save();
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Répondre à un avis
export const respondToReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { sellerId, responseText } = req.body;
    const response = await ReviewResponse.create({
      reviewId,
      sellerId,
      responseText,
    });
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
