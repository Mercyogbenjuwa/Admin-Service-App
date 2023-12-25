const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**===================================== Item  ===================================== **/
const itemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
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

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;
