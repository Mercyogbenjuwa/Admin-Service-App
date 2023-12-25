const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PaymentStatus = ['paid', 'not_paid'];
const OrderStatus = ['Pending', 'Processing', 'In Transit', 'Delivered'];
const DeliveryMode = ['air_delivery', 'ship_delivery', 'land_delivery'];


const shipperSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => /\S+@\S+\.\S+/.test(email),
      message: 'Invalid email format',
    },
  },
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  departureLocation: {
    type: String,
    required: true,
  },
  destinationLocation: {
    type: String,
    required: true,
  },
  departureDate: {
    type: String,
    required: true,
  },
  arrivalDate: {
    type: String,
    required: true,
  },
  currentLocation: {
    type: String,
    required: true,
  },
  destinationCountry: {
    type: String,
    required: true,
  },
  destinationState: {
    type: String,
    required: true,
  },
  paymentStatus: {
    type: String,
    required: true,
    enum: PaymentStatus,
  },
  orderStatus: {
    type: String,
    required: true,
    enum: OrderStatus,
  },
  deliveryMode: {
    type: String,
    required: true,
    enum: DeliveryMode,
  },
  taxName: {
    type: String,
    required: true,
  },
  taxAmount: {
    type: String,
    required: true,
  },
  totalAmount: {
    type: String,
    required: true,
  },
  chargeName: {
    type: String,
    required: true,
  },
  orderAmount: {
    type: String,
    required: true,
  },
  amount_paid: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
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

const Shipper = mongoose.model('Shipper', shipperSchema);
module.exports = Shipper;
