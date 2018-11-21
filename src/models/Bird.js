const mongoose = require('mongoose');

const birdModel= mongoose.Schema({
  images: [
    {
      fieldname: String,
      originalname: String,
      encoding: String,
      mimetype: String,
      destination: String,
      filename: String,
      path: String,
      size: Number
    }
  ],
  breed: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  addedBy: {
    type: String
  }
});

module.exports = birdModel;
