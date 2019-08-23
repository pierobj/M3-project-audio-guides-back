'use strict';

const createError = require('http-errors');
const moment = require('moment');

exports.isLoggedIn = () => (req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    next(createError(401));
  }
};

exports.isNotLoggedIn = () => (req, res, next) => {
  if (!req.session.currentUser) {
    next();
  } else {
    next(createError(403));
  }
};

exports.validationLogin = () => (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next(createError(422));
  } else {
    next();
  }
};

exports.validationSignup = () => (req, res, next) => {
  const { email, password, name, birthdate, language } = req.body;
  if (!email || !password || !name || !birthdate || !language) {
    next(createError(422));
  } else {
    next();
  }
};

exports.isAdmin = () => (req, res, next) => {
  if (req.session.currentUser.isAdmin) {
    next();
  } else {
    next(createError(401));
  }
};

exports.isTripOwner = () => (req, res, next) => {
  if (req.session.currentUser.trips.includes(req.params.id)) {
    next();
  } else {
    next(createError(401));
  }
};

exports.dateControl = () => (req, res, next) => {
  const { fromDate, toDate } = req.body;
  const today = new Date();
  if (moment(fromDate).isAfter(toDate, 'day')) {
    next(createError(460));
  } else if (moment(fromDate).isBefore(today, 'day') || moment(toDate).isBefore(today, 'day')) {
    next(createError(461));
  } else {
    next();
  }
};
