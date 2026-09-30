const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import Routes
const foodRoutes = require('./scc/routes/foodRoutes');
const cartRoutes = require('./scc/routes/cartRoutes');
const orderRoutes = require('./scc/routes/orderRoutes'); // Order route import kora hoilo

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Root / Test Route
app.get('/', (req, res) => {
  res.send('CAMFood API Server is Up and Running!');
});

// API Routes
app.use('/api/foods', foodRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes); // Order endpoint add kora hoilo

// Database Connection & Server Startup
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/camfood';

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected Successfully!');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Database Connection Error:', err);
  });