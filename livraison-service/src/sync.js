// sync.js
const sequelize = require('./config/database');
const Shipment = require('./models/Shipment');
const DeliveryEstimate = require('./models/DeliveryEstimate');
const ShippingAddress = require('./models/ShippingAddress');

const initDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to MySQL has been established successfully.');
        
        await sequelize.sync({ force: false }); // Force: false pour ne pas recréer les tables si elles existent
        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

initDatabase();
