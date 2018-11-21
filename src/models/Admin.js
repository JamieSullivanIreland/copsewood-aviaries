const mongoose = require('mongoose');

const adminModel= mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  addedBy: {
    type: String
  },
  updatedBy: {
    type: String
  }
});

module.exports = adminModel;
