// src/services/orderService.js

// src/services/orderService.js

import Order from '../models/Order.js';

export async function createOrder(data) {
  try {
    const order = await Order.create(data);
    return order;
  } catch (error) {
    console.error('Error in createOrder service:', error); // Pour aider au débogage
    throw error;
  }
}


export async function getOrdersByUser(userId) {
  try {
    const orders = await Order.findAll({ where: { userId } });
    return orders;
  } catch (error) {
    throw error;
  }
}
