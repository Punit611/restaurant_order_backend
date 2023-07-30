const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
  },
  table_id: {
    type: Number,
    required: true,
  },
  items: [
    {
      item_name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
