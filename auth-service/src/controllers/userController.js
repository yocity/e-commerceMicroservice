import User from '../models/User.js'; // Assurez-vous que le chemin est correct
import generateToken from '../utils/generateToken.js'; // Assurez-vous que le chemin est correct
import nodemailer from 'nodemailer';
import { Op } from 'sequelize'; // Importer Op de sequelize pour les opérateurs de requêtes

// Fonction utilitaire pour envoyer des emails
const envoyerEmail = async (destinataire, sujet, texte) => {
  const transporteur = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const optionsEmail = {
    from: process.env.EMAIL_USERNAME,
    to: destinataire,
    subject: sujet,
    text: texte,
  };

  return new Promise((resolve, reject) => {
    transporteur.sendMail(optionsEmail, (erreur, info) => {
      if (erreur) {
        reject(erreur);
      } else {
        resolve(info);
      }
    });
  });
};

// Contrôleur pour l'inscription de l'utilisateur
export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Vérifier si l'utilisateur existe déjà
    const utilisateurExistant = await User.findOne({ where: { email } });
    if (utilisateurExistant) {
      return res.status(400).json({ message: 'Utilisateur déjà existant' });
    }

    // Générer un code de vérification aléatoire pour la double authentification
    const codeDeVerification = Math.floor(Math.random() * 90000) + 10000;

    // Créer un nouvel utilisateur avec le code de vérification
    const utilisateur = await User.create({
      username,
      email,
      password, // Assurez-vous que le mot de passe est correctement hashé dans le modèle
      verificationCode: codeDeVerification,
      isVerified: false, // Assurez-vous que ce champ est dans votre modèle
    });

    // Envoyer le code de vérification par email
    try {
      await envoyerEmail(
        email,
        'Code de vérification',
        `Votre code de vérification est ${codeDeVerification}.`
      );
    } catch (erreurEmail) {
      console.error('Erreur lors de l\'envoi de l\'email :', erreurEmail);
      return res.status(500).json({ message: 'Échec de l\'envoi de l\'email de vérification' });
    }

    res.status(201).json({
      _id: utilisateur.id,
      username: utilisateur.username,
      email: utilisateur.email,
      message: 'Un code de vérification a été envoyé à votre email pour la double authentification.',
    });
  } catch (error) {
    console.error('Erreur lors de l\'inscription :', error);
    res.status(500).json({ message: 'Erreur du serveur', error: error.message });
  }
};

// Contrôleur pour la connexion de l'utilisateur
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Trouver l'utilisateur par email
    const utilisateur = await User.findOne({ where: { email } });

    if (!utilisateur || !(await utilisateur.matchPassword(password))) {
      return res.status(401).json({ message: 'Email ou mot de passe invalide' });
    }

    // Vérifier si l'utilisateur est vérifié
    if (!utilisateur.isVerified) {
      return res.status(401).json({ message: 'Utilisateur non vérifié' });
    }

    // Générer un token JWT
    const token = generateToken(utilisateur.id, utilisateur.email);

    // Enregistrer le token JWT dans un cookie sécurisé
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Utiliser HTTPS en production
      maxAge: 24 * 60 * 60 * 1000, // Expiration du cookie en 1 jour
    });

    res.json({
      _id: utilisateur.id,
      username: utilisateur.username,
      email: utilisateur.email,
      token,
    });
  } catch (error) {
    console.error('Erreur lors de la connexion :', error);
    res.status(500).json({ message: 'Erreur du serveur' });
  }
};

// Contrôleur pour vérifier le code de vérification pour la double authentification
export const verifyUser = async (req, res) => {
  const { email, verificationCode } = req.body;

  try {
    // Trouver l'utilisateur par email
    const utilisateur = await User.findOne({ where: { email } });

    if (!utilisateur || utilisateur.verificationCode !== verificationCode) {
      return res.status(401).json({ message: 'Code de vérification invalide' });
    }

    // Mettre à jour l'utilisateur comme vérifié
    utilisateur.isVerified = true;
    utilisateur.verificationCode = null; // Supprimer le code de vérification après vérification
    await utilisateur.save();

    res.status(200).json({ message: 'Utilisateur vérifié avec succès' });
  } catch (error) {
    console.error('Erreur lors de la vérification :', error);
    res.status(500).json({ message: 'Erreur du serveur', error: error.message });
  }
};

// Contrôleur pour la déconnexion
export const logout = (req, res) => {
  try {
    // Supprimer le cookie contenant le JWT
    res.cookie('token', '', {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: 'Déconnexion réussie' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur du serveur' });
  }
};

// Contrôleur pour obtenir le profil utilisateur
export const getProfile = async (req, res) => {
  try {
    const utilisateur = await User.findByPk(req.user.id);

    if (!utilisateur) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    res.json({
      _id: utilisateur.id,
      username: utilisateur.username,
      email: utilisateur.email,
    });
  } catch (error) {
    console.error('Erreur lors de la récupération du profil :', error);
    res.status(500).json({ message: 'Erreur du serveur' });
  }
};

// Contrôleur pour obtenir tous les utilisateurs
export const getAllUsers = async (req, res) => {
  try {
    const utilisateurs = await User.findAll({
      attributes: ['id', 'username', 'email', 'createdAt'], // Sélectionner les attributs spécifiques à retourner
      where: { softDelete: false }, // Filtrer les utilisateurs supprimés par soft delete
    });
    res.json(utilisateurs);
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs :', error);
    res.status(500).json({ message: 'Erreur du serveur', error: error.message });
  }
};

export const getAllUsersEmail = async (req, res) => {
  try {
    const utilisateurs = await User.findAll({
      attributes: ['email'], // Sélectionner les attributs spécifiques à retourner
      where: { softDelete: false }, // Filtrer les utilisateurs supprimés par soft delete
    });
    res.json(utilisateurs);
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs :', error);
    res.status(500).json({ message: 'Erreur du serveur', error: error.message });
  }
};

// Contrôleur pour obtenir un utilisateur par ID
export const getUserById = async (req, res) => {
  try {
    const utilisateur = await User.findByPk(req.params.id, {
      attributes: ['id', 'username', 'email', 'createdAt'], // Sélectionner les attributs spécifiques à retourner
    });

    if (!utilisateur || utilisateur.softDelete) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    res.json(utilisateur);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'utilisateur par ID :', error);
    res.status(500).json({ message: 'Erreur du serveur', error: error.message });
  }
};

// Contrôleur pour mettre à jour un utilisateur
export const updateUser = async (req, res) => {
  try {
    const utilisateur = await User.findByPk(req.params.id);

    if (!utilisateur || utilisateur.softDelete) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    await utilisateur.update(req.body);
    res.json(utilisateur);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
    res.status(500).json({ message: 'Erreur du serveur', error: error.message });
  }
};

// Contrôleur pour supprimer un utilisateur
export const deleteUser = async (req, res) => {
  try {
    const utilisateur = await User.findByPk(req.params.id);

    if (!utilisateur || utilisateur.softDelete) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    await utilisateur.update({ softDelete: true });
    res.status(204).json(); // Pas de contenu
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'utilisateur :', error);
    res.status(500).json({ message: 'Erreur du serveur', error: error.message });
  }
};

// Fonction pour obtenir le nombre d'utilisateurs inscrits par période
export const getUsersCountByPeriod = async (req, res) => {
  try {
    const { period } = req.query; // Période demandée (jour, mois, année)
    let date;

    // Déterminer la date de début en fonction de la période
    switch (period) {
      case 'jour':
        date = new Date();
        date.setHours(0, 0, 0, 0); // Début de la journée actuelle
        break;
      case 'mois':
        date = new Date();
        date.setDate(1); // Début du mois actuel
        break;
      case 'année':
        date = new Date();
        date.setMonth(0, 1); // Début de l'année actuelle
        break;
      default:
        return res.status(400).json({ message: 'Période invalide' });
    }

    const utilisateursCount = await User.count({
      where: {
        createdAt: {
          [Op.gte]: date,
        },
        softDelete: false, // Exclure les utilisateurs supprimés par soft delete
      },
    });

    const utilisateursListe = await User.findAll({
      attributes: ['id', 'username', 'email', 'createdAt'],
      where: {
        createdAt: {
          [Op.gte]: date,
        },
        softDelete: false, // Exclure les utilisateurs supprimés par soft delete
      },
    });

    res.json({ utilisateursCount, utilisateursListe });
  } catch (error) {
    console.error('Erreur lors de l\'obtention du nombre d\'utilisateurs par période :', error);
    res.status(500).json({ message: 'Erreur du serveur', error: error.message });
  }
};

// Contrôleur pour envoyer un email de réinitialisation de mot de passe
export const sendResetPasswordEmail = async (req, res) => {
  const { email } = req.body;

  try {
    // Trouver l'utilisateur par email
    const utilisateur = await User.findOne({ where: { email } });

    if (!utilisateur) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Générer un code de réinitialisation aléatoire
    const codeDeReinitialisation = Math.floor(Math.random() * 90000) + 10000;

    // Mettre à jour l'utilisateur avec le code de réinitialisation
    utilisateur.resetCode = codeDeReinitialisation;
    utilisateur.resetCodeExpiration = new Date(Date.now() + 30 * 60 * 1000); // Code valide pour 30 minutes
    await utilisateur.save();

    // Envoyer le code de réinitialisation par email
    try {
      await envoyerEmail(
        email,
        'Réinitialisation du mot de passe',
        `Votre code de réinitialisation est ${codeDeReinitialisation}. Ce code expire dans 30 minutes.`
      );
    } catch (erreurEmail) {
      console.error('Erreur lors de l\'envoi de l\'email de réinitialisation de mot de passe :', erreurEmail);
      return res.status(500).json({ message: 'Échec de l\'envoi de l\'email de réinitialisation de mot de passe' });
    }

    res.status(200).json({ message: 'Email de réinitialisation de mot de passe envoyé avec succès' });
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email de réinitialisation de mot de passe :', error);
    res.status(500).json({ message: 'Erreur du serveur', error: error.message });
  }
};