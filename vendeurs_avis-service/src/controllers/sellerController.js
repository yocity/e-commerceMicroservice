// controllers/sellerController.js
import Seller from '../models/Seller.js';
import Store from '../models/Store.js';
import SellerPerformance from '../models/SellerPerformance.js';
import bcrypt from 'bcrypt';

// Enregistrer un nouveau vendeur
export const registerSeller = async (req, res) => {
  try {
    const { name, email, phone, storeName, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const seller = await Seller.create({
      name,
      email,
      phone,
      storeName,
      passwordHash,
    });
    res.status(201).json(seller);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtenir les informations d'un vendeur
export const getSellerById = async (req, res) => {
  try {
    const { sellerId } = req.params;
    const seller = await Seller.findByPk(sellerId);
    if (!seller) {
      return res.status(404).json({ error: 'Seller not found' });
    }
    res.status(200).json(seller);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Créer une nouvelle boutique pour un vendeur
export const createStore = async (req, res) => {
  try {
    const { sellerId } = req.params;
    const { storeName, description } = req.body;
    const store = await Store.create({
      sellerId,
      storeName,
      description,
    });
    res.status(201).json(store);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtenir les informations de la boutique d'un vendeur
export const getStoreBySeller = async (req, res) => {
  try {
    const { sellerId } = req.params;
    const stores = await Store.findAll({ where: { sellerId } });
    res.status(200).json(stores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Suivre la performance d'un vendeur
export const trackSellerPerformance = async (req, res) => {
  try {
    const { sellerId } = req.params;
    const performance = await SellerPerformance.findOne({ where: { sellerId } });
    if (!performance) {
      return res.status(404).json({ error: 'Performance data not found' });
    }
    res.status(200).json(performance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtenir tous les vendeurs
export const getAllSellers = async (req, res) => {
  try {
    const sellers = await Seller.findAll();
    res.status(200).json(sellers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
