'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  birthdate: {
    type: Date,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  language: {
    type: String,
    enum: ['EN', 'ES', 'CN', 'HD', 'RS', 'PT', 'JP', 'AR'],
    default: 'EN',
    required: true
  },
  trips: [{
    type: ObjectId,
    ref: 'Trip'
  }],
  spots: [{
    type: ObjectId,
    ref: 'Spot'
  }],
  points: {
    type: Number,
    default: 0
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  img: {
    type: String,
    default: '/images/profile.svg'
  }
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;
