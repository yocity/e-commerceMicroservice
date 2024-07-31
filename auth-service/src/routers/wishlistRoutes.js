// routes/wishlistRoutes.js

import express from 'express';
import { protect } from '../middleware.js';
import * as wishlistController from '../controllers/wishlist.controller.js';

const router = express.Router();

router.post('/', protect, wishlistController.addItem);
router.get('/', protect, wishlistController.getWishlist);

export default router;
