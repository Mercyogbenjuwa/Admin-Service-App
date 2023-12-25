const Shipper = require('../Model/Shipper');
const Receiver = require('../Model/Receiver');
const Order = require('../Model/Order');
const Shipment = require('../Model/Shipment');
const generateTrackingId = require('../Utils/GenerateTrackingId')




/**===================================== Create Shipment ===================================== **/
exports.createShipment = async (req, res) => {
  try {
    const {
      shipperEmail,
      shipperName,
      shipperPhoneNumber,
      shipperAddress,
      shipperCountry,
      shipperState,
      shipperDepartureLocation,
      shipperDestinationLocation,
      shipperDepartureDate,
      shipperarrivalDate,
      shipperCurrentLocation,
      shipperDestinationCountry,
      shipperDestinationState,
      shipperPaymentStatus,
      shipperOrderStatus,
      shipperDeliveryMode,
      shipperTaxName,
      shipperTaxAmount,
      shipperTotalAmount,
      shipperChargeName,
      shipperOrderAmount,
      shipperAmountPaid,
      shipperComment,
      receiverEmail,
      receiverName,
      receiverPhoneNumber,
      receiverAddress,
      receiverCountry,
      receiverState,
      items,
    } = req.body;

    // ... existing code ...

    const shipper = new Shipper({
      email: shipperEmail,
      name: shipperName,
      phoneNumber: shipperPhoneNumber,
      address: shipperAddress,
      country: shipperCountry,
      state: shipperState,
      departureLocation: shipperDepartureLocation,
      destinationLocation: shipperDestinationLocation,
      departureDate: shipperDepartureDate,
      arrivalDate: shipperarrivalDate,
      currentLocation: shipperCurrentLocation,
      destinationCountry: shipperDestinationCountry,
      destinationState: shipperDestinationState,
      paymentStatus: shipperPaymentStatus,
      orderStatus: shipperOrderStatus,
      deliveryMode: shipperDeliveryMode,
      taxName: shipperTaxName,
      taxAmount: shipperTaxAmount,
      totalAmount: shipperTotalAmount,
      chargeName: shipperChargeName,
      orderAmount: shipperOrderAmount,
      amount_paid: shipperAmountPaid,
      comment: shipperComment,
    });
    await shipper.save();

    const receiver = new Receiver({
      email: receiverEmail,
      name: receiverName,
      phoneNumber: receiverPhoneNumber,
      address: receiverAddress,
      country: receiverCountry,
      state: receiverState,
    });
    await receiver.save();

    const trackingId = generateTrackingId();
    const order = new Order({
      items,
      trackingId,
      shipper: shipper._id,  // Associate shipper with order
      receiver: receiver._id,  // Associate receiver with order
    });
    await order.save();

    const createdOrder = await Order.findOne({ trackingId })
      .populate('shipper')
      .populate('receiver')
      .exec();

    res.status(201).json({
      ResponseMessage: 'Shipment created successfully!',
      ResponseCode: 201,
      ResponseData: {
        trackingId,
        shipper,
        receiver,
        order: {
          trackingId: createdOrder.trackingId,
          items: createdOrder.items,
        },
      },
    });
  } catch (error) {
    console.error('Error creating shipment:', error);
    res.status(500).json({
      ResponseMessage: 'An error occurred while creating the shipment.',
      ResponseCode: 500,
      ResponseData: null,
    });
  }
};





/**===================================== Get Shipment by Tracking ID ===================================== **/
exports.getShipmentByTrackingId = async (req, res) => {
  try {
    const { trackingId } = req.params;
    if (!trackingId) {
      return res.status(400).json({
        ResponseMessage: 'Invalid request. Tracking ID is required.',
        ResponseCode: 400,
        ResponseData: null,
      });
    }
    const order = await Order.findOne({ trackingId })
      .populate('shipper')
      .populate('receiver')
      .exec();
    if (!order) {
      return res.status(404).json({
        ResponseMessage: 'Shipment not found.',
        ResponseCode: 404,
        ResponseData: null,
      });
    }
    res.status(200).json({
      ResponseMessage: 'Shipment retrieved successfully!',
      ResponseCode: 200,
      ResponseData: {
        trackingId: order.trackingId,
        shipper: order.shipper,
        receiver: order.receiver,
        items: order.items,
      },
    });
  } catch (error) {
    res.status(500).json({
      ResponseMessage: 'An error occurred while retrieving the shipment.',
      ResponseCode: 500,
      ResponseData: null,
    });
  }
};



/**===================================== Get All Shipments ===================================== **/
exports.getAllShipments = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const totalShipments = await Order.countDocuments();
    const totalPages = Math.ceil(totalShipments / pageSize);
    const shipments = await Order.find()
      .populate('shipper')
      .populate('receiver')
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .exec();
    res.status(200).json({
      ResponseMessage: 'All shipments retrieved successfully!',
      ResponseCode: 200,
      ResponseData: {
        shipments,
        pageInfo: {
          totalShipments,
          totalPages,
          currentPage: page,
          pageSize,
        },
      },
    });
  } catch (error) {
    console.error('Error retrieving shipments:', error);
    res.status(500).json({
      ResponseMessage: 'An error occurred while retrieving shipments.',
      ResponseCode: 500,
      ResponseData: null,
    });
  }
};


exports.editShipment = async (req, res) => {
  try {
    const { trackingId } = req.params;
    const {
      shipperEmail,
      shipperName,
      shipperPhoneNumber,
      shipperAddress,
      shipperCountry,
      shipperState,
      receiverEmail,
      receiverName,
      receiverPhoneNumber,
      receiverAddress,
      receiverCountry,
      receiverState,
      items,
    } = req.body;

    // Check if the trackingId is provided
    if (!trackingId) {
      return res.status(400).json({
        ResponseMessage: 'Invalid request. Tracking ID is required.',
        ResponseCode: 400,
        ResponseData: null,
      });
    }

    // Find the existing shipment by trackingId and populate shipper and receiver details
    const existingOrder = await Order.findOne({ trackingId })
      .populate('shipper')
      .populate('receiver')
      .exec();

    // Check if the shipment exists
    if (!existingOrder) {
      return res.status(404).json({
        ResponseMessage: 'Shipment not found.',
        ResponseCode: 404,
        ResponseData: null,
      });
    }

    // Update shipper details if provided
    if (shipperEmail || shipperName || shipperPhoneNumber || shipperAddress || shipperCountry || shipperState) {
      if (existingOrder.shipper) {
        // If shipper exists, update details
        existingOrder.shipper.email = shipperEmail || existingOrder.shipper.email;
        existingOrder.shipper.name = shipperName || existingOrder.shipper.name;
        existingOrder.shipper.phoneNumber = shipperPhoneNumber || existingOrder.shipper.phoneNumber;
        existingOrder.shipper.address = shipperAddress || existingOrder.shipper.address;
        existingOrder.shipper.country = shipperCountry || existingOrder.shipper.country;
        existingOrder.shipper.state = shipperState || existingOrder.shipper.state;
      } else {
        // If shipper doesn't exist, create a new one
        const shipper = new Shipper({
          email: shipperEmail,
          name: shipperName,
          phoneNumber: shipperPhoneNumber,
          address: shipperAddress,
          country: shipperCountry,
          state: shipperState,
        });
        existingOrder.shipper = shipper;
      }
    }

    // Update receiver details if provided
    if (receiverEmail || receiverName || receiverPhoneNumber || receiverAddress || receiverCountry || receiverState) {
      if (existingOrder.receiver) {
        // If receiver exists, update details
        existingOrder.receiver.email = receiverEmail || existingOrder.receiver.email;
        existingOrder.receiver.name = receiverName || existingOrder.receiver.name;
        existingOrder.receiver.phoneNumber = receiverPhoneNumber || existingOrder.receiver.phoneNumber;
        existingOrder.receiver.address = receiverAddress || existingOrder.receiver.address;
        existingOrder.receiver.country = receiverCountry || existingOrder.receiver.country;
        existingOrder.receiver.state = receiverState || existingOrder.receiver.state;
      } else {
        // If receiver doesn't exist, create a new one
        const receiver = new Receiver({
          email: receiverEmail,
          name: receiverName,
          phoneNumber: receiverPhoneNumber,
          address: receiverAddress,
          country: receiverCountry,
          state: receiverState,
        });
        existingOrder.receiver = receiver;
      }
    }

    // Update order items if provided
    if (items) {
      existingOrder.items = items;
    }

    // Save the updated order with a longer timeout
    const updatedOrder = await existingOrder.save({ timeout: false });

    res.status(200).json({
      ResponseMessage: 'Shipment updated successfully!',
      ResponseCode: 200,
      ResponseData: {
        trackingId: updatedOrder.trackingId,
        shipper: updatedOrder.shipper,
        receiver: updatedOrder.receiver,
        items: updatedOrder.items,
      },
    });
  } catch (error) {
    console.error('Error updating shipment:', error);
    res.status(500).json({
      ResponseMessage: 'An error occurred while updating the shipment.',
      ResponseCode: 500,
      ResponseData: null,
    });
  }
};


