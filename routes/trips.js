'use strict';

const express = require('express');
const router = express.Router();

const Trip = require('../models/Trip');
const User = require('../models/User');

const { isLoggedIn } = require('../helpers/middlewares');

router.get('/', isLoggedIn(), async (req, res, next) => {
  try {
    const userId = req.session.currentUser._id;
    const listOfTrips = await User.findById(userId).populate('trips');
    res.status(200).json({ listOfTrips });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', isLoggedIn(), async (req, res, next) => {
  try {
    const tripId = req.params.id;
    const response = await Trip.findById(tripId);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

router.post('/new', isLoggedIn(), async (req, res, next) => {
  try {
    const { city, country, location, img, fromDate, toDate } = req.body;
    const userId = req.session.currentUser._id;
    const createdTrip = await Trip.create({
      city,
      country,
      location: { coordinates: location },
      img,
      fromDate,
      toDate,
      new: true
    });
    const newTripId = createdTrip._id;
    const updatedUser = await User.findByIdAndUpdate(userId, { $push: { trips: newTripId } }, { new: true });
    req.session.currentUser = updatedUser;
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
});

router.put('/:id/edit', isLoggedIn(), async (req, res, next) => {
  const { id } = req.params;
  const tripUpdated = req.body;
  try {
    const updated = await Trip.findByIdAndUpdate(id, tripUpdated, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id/delete', isLoggedIn(), async (req, res, next) => {
  const { id } = req.params;
  try {
    await Trip.findByIdAndDelete(id);
    res.status(200).json({ message: 'Trip deleted' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
