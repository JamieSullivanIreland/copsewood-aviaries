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
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  timestamp: {
    type:  Number,
    required: true
  }
});

module.exports = birdModel;
