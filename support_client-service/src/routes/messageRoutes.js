// routes/messageRoutes.js
import express from 'express';
import { getMessagesByTicketId, createMessage, getMessageById, updateMessage, deleteMessage, getAllMessages } from '../controllers/messageController.js';

const router = express.Router();

router.get('/:ticket_id', getMessagesByTicketId);
router.post('/', createMessage);
router.get('/:id', getMessageById);
router.put('/:id', updateMessage);
router.delete('/:id', deleteMessage);
router.get('/', getAllMessages); // Ajout de la route pour obtenir tous les messages

export default router;
