'use strict';

const express = require('express');
const router = express.Router();

const Spot = require('../models/Spot');

const { isLoggedIn } = require('../helpers/middlewares');

router.get('/', isLoggedIn(), async (req, res, next) => {
// router.get('/', async (req, res, next) => {
  try {
    const listOfSpots = await Spot.find();
    // como devuelve un array, lo pasamos al método json() como un objeto entre {}
    res.status(200).json({ listOfSpots });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', isLoggedIn(), async (req, res, next) => {
  try {
    const spotId = req.params.id;
    const response = await Spot.findById(spotId);
    // como devuelve un array, lo pasamos al método json() como un objeto entre {}
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
