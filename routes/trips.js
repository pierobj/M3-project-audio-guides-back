'use strict';

const express = require('express');
const router = express.Router();

const Trip = require('../models/Trip');
const User = require('../models/User');

const { isLoggedIn } = require('../helpers/middlewares');

// list of all user trips
router.get('/', async (req, res, next) => {
  try {
    const userId = req.session.currentUser._id;
    // const listOfTrips = await User.findById(userId, { trips: 1, _id: 0 }).populate('trips');
    const listOfTrips = await User.findById(userId).populate('trips');
    console.log(listOfTrips);
    // como devuelve un array, lo pasamos al método json() como un objeto entre {}
    res.status(200).json({ listOfTrips });
  } catch (error) {
    next(error);
  }
});

router.post('/new', isLoggedIn(), async (req, res, next) => {
  try {
    const { city, country, location, img, fromDate, toDate } = req.body;
    const userId = req.session.currentUser._id;
    console.log(req.body);
    const createdTrip = await Trip.create({
      city,
      country,
      // location: { coordinates: location.split(',').map(Number) },
      location: { coordinates: location },
      img,
      fromDate,
      toDate,
      new: true
    });
    const newTripId = createdTrip._id;
    console.log(req);
    const updatedUser = await User.findByIdAndUpdate(userId, { $push: { trips: newTripId } }, { new: true });
    req.session.currentUser = updatedUser;
    // Aquí devuelve un objeto, con lo cual lo podemos pasar directamente al json()
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
