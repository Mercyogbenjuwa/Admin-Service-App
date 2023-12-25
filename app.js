const express = require('express');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

const authRoutes = require('./Src/Routes/Auth');
const shipmentRoutes = require('./Src/Routes/Shipment');
const quoteRoutes = require('./Src/Routes/Quotes');
const PORT = process.env.PORT || 5000;

app.use('/api/auth', authRoutes);
app.use('/api/quote', quoteRoutes);
app.use('/api/shipment', shipmentRoutes);



app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
