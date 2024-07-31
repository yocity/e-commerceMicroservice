// utils/calculateCart.js
import { CartItems } from '../models/index.js';

export const calculateCartTotal = async (cartId) => {
    const cartItems = await CartItems.findAll({
        where: { cart_id: cartId },
    });

    let totalAmount = 0;
    cartItems.forEach(item => {
        totalAmount += item.quantity * item.price;
    });

    const tax = totalAmount * 0.2; // Exemple de taxe à 20%

    return {
        totalAmount,
        tax,
    };
};
