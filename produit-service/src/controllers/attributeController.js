// controllers/attributeController.js

import { Attribute, ProductAttribute } from '../models/index.js';

// Créer un attribut
export const createAttribute = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Le nom de l'attribut est requis." });
    }

    const attribute = await Attribute.create({ name });

    res.status(201).json(attribute);
  } catch (error) {
    console.error("Erreur lors de la création de l'attribut :", error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

// Obtenir les détails d'un attribut
export const getAttributeById = async (req, res) => {
  try {
    const attribute = await Attribute.findByPk(req.params.id, {
      include: [{ model: ProductAttribute, as: 'productAttributes' }],
    });

    if (!attribute) {
      return res.status(404).json({ message: 'Attribut non trouvé.' });
    }

    res.json(attribute);
  } catch (error) {
    console.error("Erreur lors de la récupération de l'attribut :", error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

// Mettre à jour un attribut
export const updateAttribute = async (req, res) => {
  try {
    const { name } = req.body;

    const attribute = await Attribute.findByPk(req.params.id);

    if (!attribute) {
      return res.status(404).json({ message: 'Attribut non trouvé.' });
    }

    await attribute.update({ name });

    res.json(attribute);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'attribut :", error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

// Supprimer un attribut
export const deleteAttribute = async (req, res) => {
  try {
    const attribute = await Attribute.findByPk(req.params.id);

    if (!attribute) {
      return res.status(404).json({ message: 'Attribut non trouvé.' });
    }

    await attribute.destroy();

    res.json({ message: 'Attribut supprimé avec succès.' });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'attribut :", error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

// Lister tous les attributs
export const listAttributes = async (req, res) => {
  try {
    const attributes = await Attribute.findAll({
      include: [{ model: ProductAttribute, as: 'productAttributes' }],
    });

    res.json(attributes);
  } catch (error) {
    console.error("Erreur lors de la récupération des attributs :", error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};
