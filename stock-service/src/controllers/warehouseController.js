// controllers/warehouseController.js
import db from '../models/index.js';

const { Warehouse } = db;

const createWarehouse = async (req, res) => {
  try {
    const { name, location, capacity } = req.body;
    const newWarehouse = await Warehouse.create({ name, location, capacity });
    res.status(201).json(newWarehouse);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de l\'entrepôt.', error });
  }
};

const getAllWarehouses = async (req, res) => {
  try {
    const warehouses = await Warehouse.findAll();
    res.status(200).json(warehouses);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des entrepôts.', error });
  }
};

const getWarehouseById = async (req, res) => {
  try {
    const { id } = req.params;
    const warehouse = await Warehouse.findByPk(id);
    if (!warehouse) {
      return res.status(404).json({ message: 'Entrepôt non trouvé.' });
    }
    res.status(200).json(warehouse);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération de l\'entrepôt.', error });
  }
};

const updateWarehouse = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location, capacity } = req.body;
    const warehouse = await Warehouse.findByPk(id);
    if (!warehouse) {
      return res.status(404).json({ message: 'Entrepôt non trouvé.' });
    }
    warehouse.name = name;
    warehouse.location = location;
    warehouse.capacity = capacity;
    await warehouse.save();
    res.status(200).json(warehouse);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'entrepôt.', error });
  }
};

const deleteWarehouse = async (req, res) => {
  try {
    const { id } = req.params;
    const warehouse = await Warehouse.findByPk(id);
    if (!warehouse) {
      return res.status(404).json({ message: 'Entrepôt non trouvé.' });
    }
    await warehouse.destroy();
    res.status(200).json({ message: 'Entrepôt supprimé avec succès.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'entrepôt.', error });
  }
};

export default {
  createWarehouse,
  getAllWarehouses,
  getWarehouseById,
  updateWarehouse,
  deleteWarehouse,
};
