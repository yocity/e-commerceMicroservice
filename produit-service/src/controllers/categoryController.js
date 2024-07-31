// controllers/categoryController.js

import { Category, Product } from '../models/index.js';

// Créer une catégorie
export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Le nom de la catégorie est requis.' });
    }

    const category = await Category.create({ name, description });

    res.status(201).json(category);
  } catch (error) {
    console.error('Erreur lors de la création de la catégorie :', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

// Obtenir les détails d'une catégorie
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: Product, as: 'products' }],
    });

    if (!category) {
      return res.status(404).json({ message: 'Catégorie non trouvée.' });
    }

    res.json(category);
  } catch (error) {
    console.error('Erreur lors de la récupération de la catégorie :', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

// Mettre à jour une catégorie
export const updateCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Catégorie non trouvée.' });
    }

    await category.update({ name, description });

    res.json(category);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la catégorie :', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

// Supprimer une catégorie
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Catégorie non trouvée.' });
    }

    await category.destroy();

    res.json({ message: 'Catégorie supprimée avec succès.' });
  } catch (error) {
    console.error('Erreur lors de la suppression de la catégorie :', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

// Lister toutes les catégories
export const listCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [{ model: Product, as: 'products' }],
    });

    res.json(categories);
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories :', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};
