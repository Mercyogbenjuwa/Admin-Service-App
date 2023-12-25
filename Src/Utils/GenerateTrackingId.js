const uuid = require('uuid');

const generateTrackingId = () => {
  const prefix = 'MO';
  const uniqueIdentifier = Math.floor(10000000 + Math.random() * 90000000); // Generate an 8-digit random number
  return `${prefix}-${uniqueIdentifier}`;
};

module.exports = generateTrackingId;
