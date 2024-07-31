// server.js
import express from 'express';
import { connectDB } from './database.js';
import cartRoutes from './routes/cart.js';
import couponRoutes from './routes/coupons.js';
import orderRoutes from './routes/orders.js';
import orderTrackingRoutes from './routes/orderTracking.js';
import returnRoutes from './routes/returns.js';

const app = express();

app.use(express.json());

app.use('/api/cart', cartRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/track', orderTrackingRoutes);
app.use('/api/returns', returnRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server is running on port ${PORT}`);
});
