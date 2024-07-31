// routes/orderRoutes.js

import express from 'express';
import { protect } from '../middleware.js';
import * as orderController from '../controllers/order.controller.js';

const router = express.Router();

router.post('/', protect, orderController.createOrder);
router.get('/', protect, orderController.getOrders);

export default router;
