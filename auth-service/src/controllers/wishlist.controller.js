// src/controllers/wishlist.controller.js

import * as wishlistService from '../services/wishlistService.js';

export const addItem = async (req, res) => {
  const { item } = req.body;

  try {
    const wishlistItem = await wishlistService.addItemToWishlist(req.user.id, item);
    res.status(201).json(wishlistItem);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getWishlist = async (req, res) => {
  try {
    const wishlist = await wishlistService.getWishlistByUser(req.user.id);
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
