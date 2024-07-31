// routes/deliveryEstimateRoutes.js
const express = require('express');
const { getAllEstimates, getEstimateByShipmentId, createEstimate, updateEstimate } = require('../controllers/deliveryEstimateController');

const router = express.Router();

router.get('/', getAllEstimates);
router.get('/:shipmentId', getEstimateByShipmentId);
router.post('/', createEstimate);
router.put('/:shipmentId', updateEstimate);

module.exports = router;
