// controllers/messageController.js
import Message from '../models/Message.js';

// Obtenir tous les messages
export const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.findAll({
      order: [['sent_at', 'ASC']], // Trier par date d'envoi
    });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtenir les messages par ID de ticket
export const getMessagesByTicketId = async (req, res) => {
  const { ticket_id } = req.params;
  try {
    const messages = await Message.findAll({
      where: { ticket_id },
      order: [['sent_at', 'ASC']], // Trier par date d'envoi
    });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Créer un nouveau message
export const createMessage = async (req, res) => {
  const { ticket_id, sender_id, message_text } = req.body;
  try {
    const newMessage = await Message.create({ ticket_id, sender_id, message_text });
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Obtenir un message par ID
export const getMessageById = async (req, res) => {
  const { id } = req.params;
  try {
    const message = await Message.findByPk(id);
    if (!message) {
      return res.status(404).json({ error: 'Message non trouvé' });
    }
    res.json(message);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Mettre à jour un message
export const updateMessage = async (req, res) => {
  const { id } = req.params;
  const { message_text } = req.body;
  try {
    const message = await Message.findByPk(id);
    if (!message) {
      return res.status(404).json({ error: 'Message non trouvé' });
    }
    await message.update({ message_text });
    res.json(message);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Supprimer un message
export const deleteMessage = async (req, res) => {
  const { id } = req.params;
  try {
    const message = await Message.findByPk(id);
    if (!message) {
      return res.status(404).json({ error: 'Message non trouvé' });
    }
    await message.destroy();
    res.status(200).json({ message: 'Message supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

export default {
  getAllMessages,
  getMessagesByTicketId,
  createMessage,
  getMessageById,
  updateMessage,
  deleteMessage,
};
