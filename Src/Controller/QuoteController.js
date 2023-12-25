const Quote = require('../Model/Quote');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;





/**===================================== Create Qoute ===================================== **/
exports.createQuote = async (req, res) => {
  try {
    const { email, fullName, phoneNumber, freightType, departureCountry, destinationCountry, departureState, destinationState,shipmentCategory, grossWeight, message } = req.body;
    if (!email || !fullName || !phoneNumber || !freightType || !departureCountry ||!departureState  || !destinationState || !shipmentCategory || !grossWeight || !message  ||!destinationCountry) {
      return res.status(400).json({
        ResponseMessage: 'Invalid request. All fields are required.',
        ResponseCode: 400,
        ResponseData: null,
      });
    }
    const quote = new Quote({
      email,
      fullName,
      phoneNumber, 
      freightType, 
      departureCountry, 
      destinationCountry, 
      departureState, 
      destinationState,
      shipmentCategory,
      grossWeight,
      message
    });
    await quote.save();
    res.json({
      ResponseMessage: 'Quote created successfully!',
      ResponseCode: 200,
      ResponseData: { quote },
    });
  } catch (error) {
    console.error('Error saving quote information:', error);
    res.status(500).json({
      ResponseMessage: 'An error occurred while saving quote information.',
      ResponseCode: 500,
      ResponseData: null,
    });
  }
};



/**===================================== Get Quote By Id  ===================================== **/
exports.getQuoteById = async (req, res) => {
  try {
    const quoteId = req.params.id;

    if (!ObjectId.isValid(quoteId)) {
      return res.status(400).json({
        ResponseMessage: 'Invalid quote ID format',
        ResponseCode: 400,
        ResponseData: null,
      });
    }

    const quote = await Quote.findById(quoteId);

    if (!quote) {
      return res.status(404).json({
        ResponseMessage: 'Quote not found',
        ResponseCode: 404,
        ResponseData: null,
      });
    }

    res.json({
      ResponseMessage: 'Quote retrieved successfully',
      ResponseCode: 200,
      ResponseData: { quote },
    });
  } catch (error) {
    console.error('Error getting quote by ID:', error);
    res.status(500).json({
      ResponseMessage: 'An error occurred while retrieving quote information.',
      ResponseCode: 500,
      ResponseData: null,
    });
  }
};



/**===================================== Get All Quotes  ===================================== **/
exports.getAllQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find();
    res.json({
      ResponseMessage: 'Quotes retrieved successfully',
      ResponseCode: 200,
      ResponseData: { quotes },
    });
  } catch (error) {
    console.error('Error getting all quotes:', error);
    res.status(500).json({
      ResponseMessage: 'An error occurred while retrieving quotes.',
      ResponseCode: 500,
      ResponseData: null,
    });
  }
};



/**===================================== Edit Quote  ===================================== **/
exports.editQuote = async (req, res) => {
  try {
    const { quoteId } = req.params;
    const updatedQuote = await Quote.findByIdAndUpdate(quoteId, req.body, { new: true });
    if (!updatedQuote) {
      return res.status(404).json({
        ResponseMessage: 'Quote not found',
        ResponseCode: 404,
        ResponseData: null,
      });
    }
    res.json({
      ResponseMessage: 'Quote updated successfully',
      ResponseCode: 200,
      ResponseData: {
        shipper: updatedQuote,
        adminId,
      },
    });
  } catch (error) {
    console.error('Error updating quote:', error);
    res.status(500).json({
      ResponseMessage: 'An error occurred while updating quote.',
      ResponseCode: 500,
      ResponseData: null,
    });
  }
};



/**===================================== Delete Quote   ===================================== **/
exports.deleteQuote = async (req, res) => {
  try {
    const { quoteId } = req.params;
    const deletedQuote = await Quote.findByIdAndDelete(quoteId);
    if (!deletedQuote) {
      return res.status(404).json({
        ResponseMessage: 'Quote not found',
        ResponseCode: 404,
        ResponseData: null,
      });
    }
    res.json({
      ResponseMessage: 'Quote deleted successfully',
      ResponseCode: 200,
      ResponseData: {
        quote: deletedQuote,
      },
    });
  } catch (error) {
    console.error('Error deleting quote:', error);
    res.status(500).json({
      ResponseMessage: 'An error occurred while deleting quote.',
      ResponseCode: 500,
      ResponseData: null,
    });
  }
};
