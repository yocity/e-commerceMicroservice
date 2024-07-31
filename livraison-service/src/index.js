// app.js
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./database');
const shipmentRoutes = require('./routes/shipmentRoutes');
const deliveryEstimateRoutes = require('./routes/deliveryEstimateRoutes');
const shippingAddressRoutes = require('./routes/shippingAddressRoutes');

const app = express();

app.use(bodyParser.json());

// Routes
app.use('/api/shipments', shipmentRoutes);
app.use('/api/deliveryestimates', deliveryEstimateRoutes);
app.use('/api/shippingaddresses', shippingAddressRoutes);

// Start the server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});