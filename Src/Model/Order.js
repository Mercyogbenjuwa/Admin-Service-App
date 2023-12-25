const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema(
{
  name: { 
    type: String,
    required: true 
},
  amount: { 
    type: Number, 
    required: true 
},
  currency: { 
    type: String, 
    required: true 
},
}
);


const orderSchema = new Schema({
  items: {
    type: [itemSchema],
    required: true,
  },
  trackingId: {
    type: String,
    required: true,
    unique: true,
  },
  shipper: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shipper',
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Receiver',
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shipment',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
