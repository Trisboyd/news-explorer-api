// VARIABLES_____________________________________________________________VARIABLES

// ___________________________________________modules
const express = require('express');
const mongoose = require('mongoose');
const validator = require('validator');
const { Joi, celebrate, errors } = require('celebrate');

mongoose.connect('mongodb://localhost:27017/newsexplorerdb');

// ___________________________________________application
const app = express();

// ___________________________________.env file for jwt key
require('dotenv').config();

// ________________________________________________imports
const auth = require('./middleware/auth');
const { login, createUser } = require('./controllers/user');
const userRouter = require('./routes/user');
const articleRouter = require('./routes/article');
const { requestLogger, errorLogger } = require('./middleware/logger');
const { NotFoundError } = require('./middleware/errors/notFoundError');
const errorHandler = require('./middleware/errorHandler');

// ___________________________________________PORT
const { PORT = 3000 } = process.env;

// function for email validation
const validateEmail = (string) => {
  if (!validator.isEmail(string)) {
    throw new Error('Invalid email');
  }
  return string;
};

// _________________________________Setup for app variable
app.use(express.json());

app.use(express.urlencoded());

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

// Errors_______________________________________________________________________Errors
app.use(errorLogger);

// error handler for sending errors to the client produced by celebrate
app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App is listening at port ${PORT}`);
});
