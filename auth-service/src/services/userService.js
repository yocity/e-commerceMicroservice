// services/userService.js

import User from '../models/User.js';

// Créer un nouvel utilisateur
export async function createUser(data) {
  try {
    const user = await User.create(data);
    return user;
  } catch (error) {
    throw error;
  }
}

// Obtenir tous les utilisateurs
export async function getAllUsers() {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    throw error;
  }
}

// Obtenir un utilisateur par ID
export async function getUserById(id) {
  try {
    const user = await User.findByPk(id);
    return user;
  } catch (error) {
    throw error;
  }
}

// Mettre à jour un utilisateur
export async function updateUser(id, data) {
  try {
    const user = await User.findByPk(id);
    if (user) {
      await user.update(data);
      return user;
    }
    return null;
  } catch (error) {
    throw error;
  }
}

// Supprimer un utilisateur
export async function deleteUser(id) {
  try {
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
      return true;
    }
    return false;
  } catch (error) {
    throw error;
  }
}
