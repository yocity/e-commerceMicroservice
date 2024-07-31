// controllers/messageController.js
import Message from '../models/Message.js';

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

export default {
  getMessagesByTicketId,
  createMessage,
};
