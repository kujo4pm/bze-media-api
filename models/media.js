'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mediaModel = new Schema({
  title: { type: String, required: true, index: { unique: true } },
  description: { type: String, required: true },
  recordedAt: { type: Date, required: true },
  image: { type: String, required: true }
});

module.exports = mongoose.model('Media', mediaModel, 'media'); 