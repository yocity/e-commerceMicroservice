import User from '../models/User.js'; // Assurez-vous que le chemin est correct
import generateToken from '../utils/generateToken.js'; // Assurez-vous que le chemin est correct

// Contrôleur pour l'inscription
export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Créer un nouvel utilisateur
    const user = await User.create({
      username,
      email,
      password, // Assurez-vous que le mot de passe est correctement hashé dans le modèle
    });

    // Générer un token JWT
    const token = generateToken(user.id, user.email);

    res.status(201).json({
      _id: user.id,
      username: user.username,
      email: user.email,
      token,
    });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Contrôleur pour la connexion
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Trouver l'utilisateur par email
    const user = await User.findOne({ where: { email } });

    if (user && (await user.matchPassword(password))) {
      // Générer un token JWT
      const token = generateToken(user.id, user.email);

      // Enregistrer le token JWT dans un cookie sécurisé
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Utiliser HTTPS en production
        maxAge: 24 * 60 * 60 * 1000, // Expiration du cookie en 1 jour
      });

      res.json({
        _id: user.id,
        username: user.username,
        email: user.email,
        token,
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
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
    res.status(200).json({ message: 'Successfully logged out' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Contrôleur pour obtenir le profil utilisateur
export const getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);

    if (user) {
      res.json({
        _id: user.id,
        username: user.username,
        email: user.email,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Contrôleur pour obtenir tous les utilisateurs
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Contrôleur pour obtenir un utilisateur par ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Contrôleur pour mettre à jour un utilisateur
export const updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      await user.update(req.body);
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Contrôleur pour supprimer un utilisateur
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      await user.destroy();
      res.status(204).json(); // No Content
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
