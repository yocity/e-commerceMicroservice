// controllers/ticketController.js
import Ticket from '../models/Ticket.js';

// Obtenir tous les tickets
export const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.findAll();
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Obtenir un ticket par ID
export const getTicketById = async (req, res) => {
  const { id } = req.params;
  try {
    const ticket = await Ticket.findByPk(id);
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket non trouvé' });
    }
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Créer un nouveau ticket
export const createTicket = async (req, res) => {
  const { user_id, subject } = req.body;
  try {
    const newTicket = await Ticket.create({ user_id, subject });
    res.status(201).json(newTicket);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Mettre à jour le statut d'un ticket
export const updateTicketStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const ticket = await Ticket.findByPk(id);
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket non trouvé' });
    }
    await ticket.update({ status });
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Supprimer un ticket
export const deleteTicket = async (req, res) => {
  const { id } = req.params;
  try {
    const ticket = await Ticket.findByPk(id);
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket non trouvé' });
    }
    await ticket.update({ softDelete: true });
    res.json({ message: 'Ticket restauré avec succès' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};
