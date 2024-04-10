const { Chapa } = require('chapa-nodejs');
const { User } = require('../models/user');
const { Event } = require('../models/event');

const chapa = new Chapa({
  secretKey: process.env.CHAPA_SECRET_KEY,
});

const payment = async (userId, eventId, price) => {
  try {
    const user = await User.findById(userId);
    const event = await Event.findById(eventId);

    const tx_ref = await chapa.generateTransactionReference();
    const response = await chapa.initialize({
      first_name: user.username || 'Unknown',
      email: user.email,
      currency: 'ETB',
      amount: price,
      tx_ref: tx_ref,
      callback_url: 'https://example.com/callbackurl',
      return_url: 'https://example.com/returnurl',
      customization: {
        title: `Payment for ${event.name}`,
        description: `Pay ${price} ETB for ${event.name}`,
      },
    });

    if (response.status === 'success') {
      return response.data.checkout_url;
    } else {
      throw new Error(`Payment initialization failed: ${response.message}`);
    }
  } catch (error) {
    throw new Error(`Error initializing payment: ${error.message}`);
  }
};

module.exports = {
  payment,
};
