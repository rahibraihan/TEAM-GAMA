const Order = require('../models/order');

// Create new order
exports.createOrder = async (req, res) => {
  try {
    const {
      token,
      userEmail,
      userName,
      orderType,
      items,
      subtotal,
      total,
      grandTotal,
      paymentMethod,
      paymentStatus,
    } = req.body;

    // Basic validation
    if (!userEmail) {
      return res.status(400).json({
        success: false,
        message: 'User email is required',
      });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Order must contain at least one item',
      });
    }

    // Generate token if frontend doesn't send one
    const orderToken =
      token ||
      `${orderType === 'Self Pick-up' ? 'PICKUP-' : 'CAM-'}${Math.floor(
        100000 + Math.random() * 900000
      )}`;

    const calculatedTotal = items.reduce((sum, item) => {
      return sum + Number(item.price || 0) * Number(item.quantity || 1);
    }, 0);

    const finalSubtotal =
      subtotal !== undefined ? Number(subtotal) : calculatedTotal;

    const finalTotal =
      total !== undefined ? Number(total) : calculatedTotal;

    const finalGrandTotal =
      grandTotal !== undefined ? Number(grandTotal) : finalTotal;

    const newOrder = await Order.create({
      token: orderToken,
      userEmail,
      userName: userName || '',
      orderType: orderType || 'Dine-In',
      items: items.map((item) => ({
        name: item.name,
        price: Number(item.price),
        quantity: Number(item.quantity || 1),
      })),
      subtotal: finalSubtotal,
      total: finalTotal,
      grandTotal: finalGrandTotal,
      status: 'Pending',
      paymentMethod: paymentMethod || 'Cash',
      paymentStatus: paymentStatus || 'Pending',
    });

    res.status(201).json({
      success: true,
      message: 'Order saved to database successfully!',
      data: newOrder,
    });
  } catch (error) {
    console.error('Create Order Error:', error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Get orders of a user
exports.getUserOrders = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required',
      });
    }

    const orders = await Order.find({
      userEmail: email.toLowerCase(),
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      'Pending',
      'Preparing',
      'Ready for Pickup',
      'Completed',
      'Cancelled',
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid order status',
      });
    }

    const order = await Order.findOneAndUpdate(
      { token: req.params.token },
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Order status updated successfully!',
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};