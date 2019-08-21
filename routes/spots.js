'use strict';

const express = require('express');
const router = express.Router();

const Spot = require('../models/Spot');

const { isLoggedIn } = require('../helpers/middlewares');

router.get('/', async (req, res, next) => {
  try {
    const listOfSpots = await Spot.find();
    res.status(200).json({ listOfSpots });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const spotId = req.params.id;
    const response = await Spot.findById(spotId);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
