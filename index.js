const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import Routes
const foodRoutes = require('./scc/routes/foodRoutes');
const cartRoutes = require('./scc/routes/cartRoutes');
const orderRoutes = require('./scc/routes/orderRoutes');

const app = express();

// Middlewares - CORS Open for Vercel
app.use(express.json());
app.use(cors({
  origin: "*",
  credentials: true
}));

// MongoDB Connection (Serverless Friendly)
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/camfood';

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully!'))
  .catch((err) => console.error('❌ Database Connection Error:', err));

// Root / Test Route
app.get('/', (req, res) => {
  res.send('CAMFood API Server is Up and Running!');
});

// API Routes (Direct and /api routes to prevent 404/Failed errors)
app.use('/api/foods', foodRoutes);
app.use('/foods', foodRoutes); // Extra path added for front-end compatibility

app.use('/api/cart', cartRoutes);
app.use('/cart', cartRoutes);

app.use('/api/orders', orderRoutes);
app.use('/orders', orderRoutes);

// Export app for Vercel Serverless Function
module.exports = app;

// Local development server execution
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}