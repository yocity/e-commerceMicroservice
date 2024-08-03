// controllers/inventoryController.js
import db from '../models/index.js';

const { Inventory, Product, Warehouse } = db;

const addStock = async (req, res) => {
  try {
    const { product_id, warehouse_id, stock_level, reorder_threshold } = req.body;

    const product = await Product.findByPk(product_id);
    const warehouse = await Warehouse.findByPk(warehouse_id);

    if (!product || !warehouse) {
      return res.status(404).json({ message: 'Produit ou entrepôt non trouvé.' });
    }

    const newInventory = await Inventory.create({
      product_id,
      warehouse_id,
      stock_level,
      reorder_threshold,
    });

    res.status(201).json(newInventory);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'ajout du stock.', error });
  }
};

const getStock = async (req, res) => {
  try {
    const { productId, warehouseId } = req.params;
    const inventory = await Inventory.findOne({
      where: {
        product_id: productId,
        warehouse_id: warehouseId,
      },
      include: [Product, Warehouse],
    });

    if (!inventory) {
      return res.status(404).json({ message: 'Enregistrement de stock non trouvé.' });
    }

    res.status(200).json(inventory);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération du stock.', error });
  }
};

const updateStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { stock_level, reorder_threshold } = req.body;

    const inventory = await Inventory.findByPk(id);

    if (!inventory) {
      return res.status(404).json({ message: 'Enregistrement de stock non trouvé.' });
    }

    inventory.stock_level = stock_level;
    inventory.reorder_threshold = reorder_threshold;

    await inventory.save();

    res.status(200).json(inventory);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour du stock.', error });
  }
};

const deleteStock = async (req, res) => {
  try {
    const { id } = req.params;

    const inventory = await Inventory.findByPk(id);

    if (!inventory) {
      return res.status(404).json({ message: 'Enregistrement de stock non trouvé.' });
    }

    await inventory.update({ softDelete: true });

    res.status(200).json({ message: 'Enregistrement de stock supprimé avec succès.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du stock.', error });
  }
};

const checkReorderLevels = async () => {
  try {
    const inventories = await Inventory.findAll({
      where: {
        stock_level: {
          [db.Sequelize.Op.lte]: db.Sequelize.col('reorder_threshold'),
        },
      },
      include: [Product, Warehouse],
    });

    inventories.forEach((inventory) => {
      console.log(`Alerte: Le produit ${inventory.Product.name} à l'entrepôt ${inventory.Warehouse.name} est sous le seuil de réapprovisionnement.`);
      // Vous pouvez ajouter ici une logique pour envoyer des emails ou des notifications
    });
  } catch (error) {
    console.error('Erreur lors de la vérification des niveaux de réapprovisionnement:', error);
  }
};

// Appelez cette fonction régulièrement (par exemple, avec un cron job)
setInterval(checkReorderLevels, 3600000); // Toutes les heures

export default {
  addStock,
  getStock,
  updateStock,
  deleteStock,
};
