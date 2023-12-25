const express = require('express');
const router = express.Router();
const quoteController = require('../Controller/QuoteController');
const adminMiddleware = require('../Middleware/AdminMiddleware');


/**===================================== Shippers Routes ===================================== **/
router.post('/create-quote', adminMiddleware.authenticate,  quoteController.createQuote);
router.get('/:quoteId', adminMiddleware.authenticate, quoteController.getQuoteById);
router.get('/', adminMiddleware.authenticate, quoteController.getAllQuotes);
router.put('/:quoteId', adminMiddleware.authenticate, quoteController.editQuote);
router.delete('/:quoteId', adminMiddleware.authenticate, quoteController.deleteQuote);

module.exports = router;


