const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PaymentStatus = ['paid', 'not_paid'];
const OrderStatus = ['Pending', 'Processing', 'In Transit', 'Delivered'];
const DeliveryMode = ['air_delivery', 'ship_delivery', 'land_delivery'];

/**=====================================  Shipment ===================================== **/
const shipmentSchema = new Schema({

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Shipment = mongoose.model('Shipment', shipmentSchema);

module.exports = Shipment;
