'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const spotSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['culture-sports', 'architecture', 'history', 'nature-sightseeing', 'gastronomy', 'alternative-others'],
    required: true
  },
  city: {
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
  img: {
    type: String,
    required: true
  },
  rating: [Number],
  tags: [String],
  played: { type: Number },
  customIcon: { type: String },
  audioFile: { type: String }
}, {
  timestamps: true
});

spotSchema.index({ location: '2dsphere' });

const Spot = mongoose.model('Spot', spotSchema);

module.exports = Spot;
