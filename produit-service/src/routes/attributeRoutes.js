// routes/attributeRoutes.js

import express from 'express';
import {
  createAttribute,
  getAttributeById,
  updateAttribute,
  deleteAttribute,
  listAttributes,
} from '../controllers/attributeController.js';

const router = express.Router();

// Créer un attribut
router.post('/', createAttribute);

// Obtenir les détails d'un attribut
router.get('/:id', getAttributeById);

// Mettre à jour un attribut
router.put('/:id', updateAttribute);

// Supprimer un attribut
router.delete('/:id', deleteAttribute);

// Lister tous les attributs
router.get('/', listAttributes);

export default router;
