// src/controllers/order.controller.js

import * as orderService from '../services/orderService.js';

export const createOrder = async (req, res) => {
  const { orderDate, totalAmount, status } = req.body;

  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'User ID is missing' });
    }

    const order = await orderService.createOrder({
      userId: req.user.id, // Assurez-vous que userId est inclus
      orderDate,
      totalAmount,
      status,
    });

    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating order:', error); // Pour aider au débogage
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};



export const getOrders = async (req, res) => {
  try {
    const orders = await orderService.getOrdersByUser(req.user.id);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
