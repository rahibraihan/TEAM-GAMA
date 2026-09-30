const express = require('express');

const router = express.Router();

const orderController = require('../controllers/orderController');

// Create order
router.post('/', orderController.createOrder);

// Get orders of a user
router.get('/mine', orderController.getUserOrders);

// Get all orders
router.get('/', orderController.getAllOrders);

// Update order status
router.patch('/:token/status', orderController.updateOrderStatus);

module.exports = router;