const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const freightType = ['air_delivery', 'ship_delivery', 'road_delivery'];


/**===================================== Quote  ===================================== **/

const quoteSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
    validator: (email) => /\S+@\S+\.\S+/.test(email),
    message: 'Invalid email format',
    },
  },
  fullName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  freightType: {
    type: String,
    required: true,
    enum: freightType,
  },
  departureCountry: {
    type: String,
    required: true,
  },
  destinationCountry: {
    type: String,
    required: true,
  },
  departureState: {
    type: String,
    required: true,
  },
  destinationState: {
    type: String,
    required: true,
  },
  shipmentCategory: {
    type: String,
    required: true,
  },
  grossWeight: {
    type: String,
    required: true,
  },
  message: {
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

const Quote = mongoose.model('Quote', quoteSchema);
module.exports = Quote;
