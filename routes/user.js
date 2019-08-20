'use strict';

const express = require('express');
const router = express.Router();

const User = require('../models/Spot');

const { isLoggedIn } = require('../helpers/middlewares');

router.put('/spots/:id/change', async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    // como devuelve un array, lo pasamos al método json() como un objeto entre {}
    // res.status(200).json({ listOfSpots });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
