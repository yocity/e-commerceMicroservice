// app.js
import express from 'express';
import ticketRoutes from './routes/ticketRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import faqRoutes from './routes/faqRoutes.js';

const app = express();
app.use(express.json());


app.use('/api/tickets', ticketRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/faqs', faqRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
