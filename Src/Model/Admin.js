const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**===================================== Admin ===================================== **/
const adminSchema = new Schema(
{
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
    validator: (email) => /\S+@\S+\.\S+/.test(email),
    message: 'Invalid email format',
    },
},
  username: {
    type: String, 
    required: true 
},
  password: { 
    type: String, 
    required: true 
},
  createdAt: { 
    type: Date, 
    default: Date.now 
},
  updatedAt: { 
    type: Date, 
    default: Date.now 
},
}
);
const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
