const mongoose = require('mongoose');

const shortUrlSchema = new mongoose.Schema({
  shortId: {
    type: String,
    unique: true,
    required: true,
  },
  destinationUrl: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expirationDate: {
    type: Date,
    required: true,
  },
});

const ShortUrl = mongoose.model('ShortUrl', shortUrlSchema);

module.exports = ShortUrl;
