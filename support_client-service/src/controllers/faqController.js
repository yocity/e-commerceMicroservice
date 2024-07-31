// controllers/faqController.js
import FAQ from '../models/FAQ.js';

// Obtenir toutes les FAQs
export const getAllFAQs = async (req, res) => {
  try {
    const faqs = await FAQ.findAll();
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Obtenir une FAQ par ID
export const getFAQById = async (req, res) => {
  const { id } = req.params;
  try {
    const faq = await FAQ.findByPk(id);
    if (!faq) {
      return res.status(404).json({ error: 'FAQ non trouvée' });
    }
    res.json(faq);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Créer une nouvelle FAQ
export const createFAQ = async (req, res) => {
  const { question, answer } = req.body;
  try {
    const newFAQ = await FAQ.create({ question, answer });
    res.status(201).json(newFAQ);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Mettre à jour une FAQ
export const updateFAQ = async (req, res) => {
  const { id } = req.params;
  const { question, answer } = req.body;
  try {
    const faq = await FAQ.findByPk(id);
    if (!faq) {
      return res.status(404).json({ error: 'FAQ non trouvée' });
    }
    await faq.update({ question, answer });
    res.json(faq);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Supprimer une FAQ
export const deleteFAQ = async (req, res) => {
  const { id } = req.params;
  try {
    const faq = await FAQ.findByPk(id);
    if (!faq) {
      return res.status(404).json({ error: 'FAQ non trouvée' });
    }
    await faq.destroy();
    res.json({ message: 'FAQ supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};
