const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwt: jwtConfig } = require('../Config/DbConfig');
const Admin = require('../Model/Admin');


/**===================================== Register Admin ===================================== **/
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({
        ResponseMessage: 'Invalid request. Make sure to include username, email, and password in the request.',
        ResponseCode: 400,
        ResponseData: null,
      });
    }
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        ResponseMessage: 'Invalid email format.',
        ResponseCode: 400,
        ResponseData: null,
      });
    }
    const existingUser = await Admin.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        ResponseMessage: 'Email already exists.',
        ResponseCode: 400,
        ResponseData: null,
      });
    }
    const existingUserName = await Admin.findOne({ username });
    if (existingUserName) {
      return res.status(400).json({
        ResponseMessage: 'User name already exists.',
        ResponseCode: 400,
        ResponseData: null,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await Admin.create({ username, email, password: hashedPassword });
    res.json({
      ResponseMessage: 'Admin registered successfully!',
      ResponseCode: 200,
      ResponseData: { user },
    });
  } catch (error) {
    res.status(500).json({
      ResponseMessage: 'An error occurred while registering the user.',
      ResponseCode: 500,
      ResponseData: null,
    });
  }
};


  
  
/**===================================== Admin Login ===================================== **/
exports.login = async (req, res) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({
          ResponseMessage: 'Invalid request. Make sure to include username and password in the request.',
          ResponseCode: 400,
          ResponseData: null,
        });
      }
      const admin = await Admin.findOne({ username });
      if (!admin) {
        return res.status(404).json({
          ResponseMessage: 'Admin not found.',
          ResponseCode: 404,
          ResponseData: null,
        });
      }
      const passwordMatch = await bcrypt.compare(password, admin.password);
      if (!passwordMatch) {
        return res.status(401).json({
          ResponseMessage: 'Incorrect password.',
          ResponseCode: 401,
          ResponseData: null,
        });
      }  
      const token = jwt.sign({ id: admin.id }, jwtConfig.secretKey, {
        expiresIn: jwtConfig.expiresIn,
      });
      res.json({
        ResponseMessage: 'Login successful!',
        ResponseCode: 200,
        ResponseData: { token, admin },
      });
    } catch (error) {
      console.log(error)
      res.status(500).json({
        ResponseMessage: 'An error occurred while logging in.',
        ResponseCode: 500,
        ResponseData: null,
      });
    }
  };
  

  

