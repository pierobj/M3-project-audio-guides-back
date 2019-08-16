'use strict';

const express = require('express');
const router = express.Router();

const Spot = require('../models/Spot');

const { isLoggedIn, isAdmin } = require('../helpers/middlewares');

// router.get('/', isLoggedIn(), isAdmin(), async (req, res, next) => {
router.get('/spots', async (req, res, next) => {
  try {
    const listOfSpots = await Spot.find();
    // como devuelve un array, lo pasamos al método json() como un objeto entre {}
    res.status(200).json({ listOfSpots });
  } catch (error) {
    next(error);
  }
});

// router.post('/new', isLoggedIn(), isAdmin(), async (req, res, next) => {
router.post('/spots/new', async (req, res, next) => {
  try {
    const newSpot = req.body;
    const createdSpot = await Spot.create(newSpot);
    // Aquí devuelve un objeto, con lo cual lo podemos pasar directamente al json()
    res.status(200).json(createdSpot);
  } catch (error) {
    next(error);
  }
});

// router.put('/:id/edit', isLoggedIn(), isAdmin(), async (req, res, next) => {
router.put('/spots/:id/edit', async (req, res, next) => {
  const { id } = req.params;
  const spotUpdated = req.body;
  try {
    const updated = await Spot.findByIdAndUpdate(id, spotUpdated, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
