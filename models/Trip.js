'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tripSchema = new Schema({
  city: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: {
      type: [],
      required: true
    }
  },
  img: { type: String },
  fromDate: {
    type: Date,
    min: Date.now
  },
  toDate: {
    type: Date,
    min: Date.now
  }
}, {
  timestamps: true
});

tripSchema.index({ location: '2dsphere' });

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;
