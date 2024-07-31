// controllers/productController.js

import { Product, Category, Attribute, ProductAttribute } from '../models/index.js';

// Créer un produit
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, categoryId, attributes } = req.body;

    // Vérification des champs obligatoires
    if (!name || !description || !price || !stock || !categoryId) {
      return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    // Vérification de l'existence de la catégorie
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Catégorie non trouvée.' });
    }

    // Création du produit
    const product = await Product.create({
      name,
      description,
      price,
      stock,
      category_id: categoryId,
    });

    // Ajout des attributs du produit
    if (attributes && Array.isArray(attributes)) {
      for (const attr of attributes) {
        const { attributeId, value } = attr;

        // Vérification de l'existence de l'attribut
        const attribute = await Attribute.findByPk(attributeId);
        if (!attribute) {
          return res.status(404).json({ message: `Attribut avec ID ${attributeId} non trouvé.` });
        }

        // Création de l'attribut du produit
        await ProductAttribute.create({
          product_id: product.id,
          attribute_id: attributeId,
          value,
        });
      }
    }

    res.status(201).json(product);
  } catch (error) {
    console.error('Erreur lors de la création du produit :', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

// Obtenir les détails d'un produit
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [
        { model: Category, as: 'category' },
        { model: Attribute, as: 'attributes', through: { attributes: ['value'] } },
      ],
    });

    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé.' });
    }

    res.json(product);
  } catch (error) {
    console.error('Erreur lors de la récupération du produit :', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

// Mettre à jour un produit
export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, stock, categoryId, attributes } = req.body;

    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé.' });
    }

    // Mise à jour des données du produit
    await product.update({
      name,
      description,
      price,
      stock,
      category_id: categoryId,
    });

    // Mise à jour des attributs du produit
    if (attributes && Array.isArray(attributes)) {
      // Supprimer les anciens attributs
      await ProductAttribute.destroy({ where: { product_id: product.id } });

      for (const attr of attributes) {
        const { attributeId, value } = attr;

        // Vérification de l'existence de l'attribut
        const attribute = await Attribute.findByPk(attributeId);
        if (!attribute) {
          return res.status(404).json({ message: `Attribut avec ID ${attributeId} non trouvé.` });
        }

        // Création de l'attribut du produit
        await ProductAttribute.create({
          product_id: product.id,
          attribute_id: attributeId,
          value,
        });
      }
    }

    res.json(product);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du produit :', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

// Supprimer un produit
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé.' });
    }

    await product.destroy();

    res.json({ message: 'Produit supprimé avec succès.' });
  } catch (error) {
    console.error('Erreur lors de la suppression du produit :', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

// Lister tous les produits
export const listProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, minPrice, maxPrice, attributes } = req.query;

    const offset = (page - 1) * limit;

    const whereConditions = {};

    if (category) {
      whereConditions.category_id = category;
    }

    if (minPrice) {
      whereConditions.price = { [Sequelize.Op.gte]: parseFloat(minPrice) };
    }

    if (maxPrice) {
      whereConditions.price = {
        ...(whereConditions.price || {}),
        [Sequelize.Op.lte]: parseFloat(maxPrice),
      };
    }

    const products = await Product.findAndCountAll({
      where: whereConditions,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['created_at', 'DESC']],
      include: [
        { model: Category, as: 'category' },
        { model: Attribute, as: 'attributes', through: { attributes: ['value'] } },
      ],
    });

    res.json({
      totalItems: products.count,
      totalPages: Math.ceil(products.count / limit),
      currentPage: parseInt(page),
      products: products.rows,
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des produits :', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};
