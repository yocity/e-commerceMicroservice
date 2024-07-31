// controllers/searchController.js

import { Product, Category, Attribute } from '../models/index.js';
import { Op } from 'sequelize';

// Fonction de recherche de produits avec filtrage et tri
export const searchProducts = async (req, res) => {
  try {
    const { query, category, minPrice, maxPrice, sortBy, order } = req.query;

    // Construction des conditions de recherche
    const searchConditions = {
      where: {},
      include: [],
    };

    // Recherche par nom ou description de produit
    if (query) {
      searchConditions.where = {
        [Op.or]: [
          { name: { [Op.like]: `%${query}%` } },
          { description: { [Op.like]: `%${query}%` } },
        ],
      };
    }

    // Filtrage par catégorie
    if (category) {
      searchConditions.include.push({
        model: Category,
        as: 'category',
        where: { id: category },
      });
    }

    // Filtrage par prix
    if (minPrice) {
      searchConditions.where.price = { [Op.gte]: Number(minPrice) };
    }
    if (maxPrice) {
      searchConditions.where.price = {
        ...(searchConditions.where.price || {}),
        [Op.lte]: Number(maxPrice),
      };
    }

    // Tri des résultats
    const orderOptions = [];
    if (sortBy && order) {
      orderOptions.push([sortBy, order.toUpperCase()]);
    } else {
      orderOptions.push(['name', 'ASC']); // Tri par défaut par nom
    }

    // Requête pour obtenir les produits
    const products = await Product.findAll({
      ...searchConditions,
      order: orderOptions,
    });

    res.json(products);
  } catch (error) {
    console.error("Erreur lors de la recherche des produits :", error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

// Fonction de suggestion de recherche
export const suggestProducts = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: 'Le terme de recherche est requis.' });
    }

    // Recherche des produits correspondant au début du nom
    const suggestions = await Product.findAll({
      where: {
        name: { [Op.like]: `${query}%` },
      },
      attributes: ['id', 'name'], // Sélectionner uniquement les champs nécessaires
      limit: 5, // Limiter les résultats à 5 suggestions
    });

    res.json(suggestions);
  } catch (error) {
    console.error("Erreur lors de la suggestion de produits :", error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};
