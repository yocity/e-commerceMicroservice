// services/wishlistService.js

import Wishlist from '../models/Wishlist.js';

export async function addItemToWishlist(userId, item) {
  try {
    const wishlistItem = await Wishlist.create({ userId, item });
    return wishlistItem;
  } catch (error) {
    throw error;
  }
}

export async function getWishlistByUser(userId) {
  try {
    const wishlist = await Wishlist.findAll({ where: { userId } });
    return wishlist;
  } catch (error) {
    throw error;
  }
}
