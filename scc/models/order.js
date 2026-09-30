const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    quantity: {
      type: Number,
      default: 1,
      min: 1,
    },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    userEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    userName: {
      type: String,
      default: '',
      trim: true,
    },

    orderType: {
      type: String,
      enum: ['Self Pick-up', 'Dine-In'],
      default: 'Dine-In',
    },

    items: {
      type: [orderItemSchema],
      required: true,
    },

    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },

    total: {
      type: Number,
      required: true,
      min: 0,
    },

    grandTotal: {
      type: Number,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      enum: [
        'Pending',
        'Preparing',
        'Ready for Pickup',
        'Completed',
        'Cancelled',
      ],
      default: 'Pending',
    },

    paymentMethod: {
      type: String,
      default: 'Cash',
    },

    paymentStatus: {
      type: String,
      enum: ['Pending', 'Paid', 'Failed'],
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Order', orderSchema);