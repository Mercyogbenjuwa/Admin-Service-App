const express = require('express');
const router = express.Router();
const shipmentController = require('../Controller/ShipmentController');
const adminMiddleware = require('../Middleware/AdminMiddleware');


/**===================================== Shippers Routes ===================================== **/
router.post('/create-shipment',  shipmentController.createShipment);
router.get('/:trackingId',  shipmentController.getShipmentByTrackingId);
router.get('/', shipmentController.getAllShipments);
router.put('/:trackingId', shipmentController.editShipment);


module.exports = router;


