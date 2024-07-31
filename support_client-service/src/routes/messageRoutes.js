// routes/messageRoutes.js
import express from 'express';
import { getMessagesByTicketId, createMessage } from '../controllers/messageController.js';

const router = express.Router();

router.get('/:ticket_id', getMessagesByTicketId);
router.post('/', createMessage);

export default router;
