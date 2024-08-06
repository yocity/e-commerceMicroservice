import express from 'express';
import { register, login, logout, getProfile, verifyUser, sendResetPasswordEmail, getUsersCountByPeriod } from '../controllers/userController.js';
import * as userController from '../controllers/userController.js';
import { protect } from '../middleware.js';

const router = express.Router();

// Routes d'authentification
router.post('/auth/register', register); // Route pour l'inscription
router.post('/auth/login', login);       // Route pour la connexion
router.post('/auth/logout', logout);     // Route pour la déconnexion
router.get('/auth/profile', protect, getProfile); // Route pour obtenir le profil utilisateur (protégée)
router.post('/auth/verify', verifyUser); // Route pour vérifier le code de vérification
router.post('/auth/reset-password', sendResetPasswordEmail); // Route pour envoyer un email de réinitialisation de mot de passe

// Routes utilisateur
router.get('/users', protect, userController.getAllUsers);  // Route pour obtenir tous les utilisateurs
router.get('/users/:id', protect, userController.getUserById); // Route pour obtenir un utilisateur par ID
router.put('/users/:id', protect, userController.updateUser); // Route pour mettre à jour un utilisateur
router.delete('/users/:id', protect, userController.deleteUser); // Route pour supprimer un utilisateur
router.get('/users/count', protect, getUsersCountByPeriod); // Route pour obtenir le nombre d'utilisateurs inscrits par période

export default router;