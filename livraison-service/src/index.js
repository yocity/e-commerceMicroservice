// app.js
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const shipmentRoutes = require('./routes/shipmentRoutes');
const deliveryEstimateRoutes = require('./routes/deliveryEstimateRoutes');
const shippingAddressRoutes = require('./routes/shippingAddressRoutes');

const app = express();

app.use(bodyParser.json());

// Routes
app.use('/api/shipments', shipmentRoutes);
app.use('/api/delivery-estimates', deliveryEstimateRoutes);
app.use('/api/shipping-addresses', shippingAddressRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
