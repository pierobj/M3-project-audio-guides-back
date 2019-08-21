'use strict';

const express = require('express');
const router = express.Router();

const User = require('../models/User');

const { isLoggedIn } = require('../helpers/middlewares');

router.put('/spots/:id/switch', isLoggedIn(), async (req, res, next) => {
  try {
    const spotId = req.params.id;
    const userId = req.session.currentUser._id;
    const currentSpots = req.session.currentUser.spots;
    let updatedUser = null;
    if (currentSpots.includes(spotId)) {
      updatedUser = await User.findByIdAndUpdate(userId, { $pull: { spots: spotId } }, { new: true });
    } else {
      updatedUser = await User.findByIdAndUpdate(userId, { $push: { spots: spotId } }, { new: true });
    }
    req.session.currentUser = updatedUser;
    res.status(200).json({ updatedUser });
  } catch (error) {
    next(error);
  }
});

router.put('/updateImage', isLoggedIn(), async (req, res, next) => {
  try {
    const { imageURL } = req.body;
    console.log(imageURL);
    const userId = req.session.currentUser._id;
    const updatedUser = await User.findByIdAndUpdate(userId, { img: imageURL }, { new: true });
    req.session.currentUser = updatedUser;
    res.status(200).json({ updatedUser });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
