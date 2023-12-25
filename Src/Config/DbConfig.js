const mongoose = require('mongoose');
require('dotenv').config();


/**===================================== Database Connection ===================================== **/
const mongoURL = process.env.MONGO_URL;
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log(`MongoDB Connected: ${mongoose.connection.host}`);
})
.catch((error) => {
  console.error(`Error connecting to MongoDB: ${error.message}`);
});
module.exports = mongoose;



/**===================================== Generate Random String ===================================== **/
const generateRandomString = (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const secretKey = generateRandomString(32);




const expiresIn = '60m';  
module.exports = {
  jwt: {
    secretKey: secretKey,
    expiresIn: expiresIn,
  },
};
