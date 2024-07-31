// routes/shipmentRoutes.js
const express = require('express');
const { getAllShipments, getShipmentById, createShipment, updateShipment } = require('../controllers/shipmentController');

const router = express.Router();

router.get('/', getAllShipments);
router.get('/:id', getShipmentById);
router.post('/', createShipment);
router.put('/:id', updateShipment);

module.exports = router;
