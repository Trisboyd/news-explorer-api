const express = require('express');
const { Joi, celebrate } = require('celebrate');
const validator = require('validator');

const auth = require('../middleware/auth');
const { login, createUser } = require('../controllers/user');
const userRouter = require('./user');
const articleRouter = require('./article');
const { NotFoundError } = require('../middleware/errors/notFoundError');
const { requestLogger } = require('../middleware/logger');

const app = express();

// ________________________function for email validation
const validateEmail = (string) => {
  if (!validator.isEmail(string)) {
    throw new Error('Invalid email');
  }
  return string;
};

// ROUTES_________________________________________________________________________ROUTES
app.use(requestLogger); // log all requests from following routes

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom(validateEmail),
    password: Joi.string().required(),
  }),
}), createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom(validateEmail),
    password: Joi.string().required(),
  }),
}), login);

// __________________________________________Routes requiring authorization
app.use(auth);

app.use(userRouter);
app.use(articleRouter);

app.get('*', () => {
  throw new NotFoundError('Requested resource not found');
});

module.exports =