const { Joi, celebrate } = require('celebrate');
const validator = require('validator');
const router = require('express').Router();
const auth = require('../middleware/auth');
const { login, createUser } = require('../controllers/user');
const userRouter = require('./user');
const articleRouter = require('./article');
const NotFoundError = require('../middleware/errors/notFoundError');
const notFound = require('../utilities/errorMessages/notFound');
const { requestLogger } = require('../middleware/logger');

// ________________________function for email validation
const validateEmail = (string) => {
  if (!validator.isEmail(string)) {
    throw new Error('Invalid email');
  }
  return string;
};

// ROUTES_________________________________________________________________________ROUTES
router.use(requestLogger); // log all requests from following routes

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom(validateEmail),
    password: Joi.string().required(),
    name: Joi.string().required(),
  }),
}), createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom(validateEmail),
    password: Joi.string().required(),
  }),
}), login);

// __________________________________________Routes requiring authorization
router.use(auth);

router.use(userRouter);
router.use(articleRouter);

router.get('*', () => {
  throw new NotFoundError(notFound);
});

module.exports = router;
