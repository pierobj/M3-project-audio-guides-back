'use strict';

const express = require('express');
const router = express.Router();

const User = require('../models/User');

const { isLoggedIn } = require('../helpers/middlewares');

router.put('/spots/:id/switch', async (req, res, next) => {
  try {
    const spotId = req.params.id;
    const userId = req.session.currentUser._id;
    const currentSpots = req.session.currentUser.spots;
    console.log(currentSpots);
    let updatedUser = null;
    if (currentSpots.includes(spotId)) {
      updatedUser = await User.findByIdAndUpdate(userId, { $pull: { spots: spotId } }, { new: true });
    } else {
      updatedUser = await User.findByIdAndUpdate(userId, { $push: { spots: spotId } }, { new: true });
    }
    console.log(updatedUser);
    req.session.currentUser = updatedUser;
    // como devuelve un array, lo pasamos al método json() como un objeto entre {}
    res.status(200).json({ updatedUser });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
