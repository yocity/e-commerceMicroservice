// app.js
import express from 'express';
import dotenv from 'dotenv';
import sequelize from './database.js';
import reviewRoutes from './routes/reviews.js';
import sellerRoutes from './routes/sellers.js';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/reviews', reviewRoutes);
app.use('/api/sellers', sellerRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
