// routes/shippingAddressRoutes.js
const express = require('express');
const { getAllAddresses, getAddressById, createAddress, updateAddress } = require('../controllers/shippingAddressController');

const router = express.Router();

router.get('/', getAllAddresses);
router.get('/:id', getAddressById);
router.post('/', createAddress);
router.put('/:id', updateAddress);

module.exports = router;
