// controllers/productController.js
import db from '../models/index.js';

const { Product } = db;

const createProduct = async (req, res) => {
  try {
    const { name, description, sku, price } = req.body;
    const newProduct = await Product.create({ name, description, sku, price });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création du produit.', error });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des produits.', error });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé.' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération du produit.', error });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, sku, price } = req.body;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé.' });
    }
    product.name = name;
    product.description = description;
    product.sku = sku;
    product.price = price;
    await product.save();
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour du produit.', error });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé.' });
    }
    await product.destroy();
    res.status(200).json({ message: 'Produit supprimé avec succès.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du produit.', error });
  }
};

export default {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
