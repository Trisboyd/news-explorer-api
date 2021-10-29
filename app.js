// VARIABLES_____________________________________________________________VARIABLES

// ___________________________________________modules
const express = require('express');
const mongoose = require('mongoose');
// const validator = require('validator');
const { errors } = require('celebrate');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const index = require('./routes/index');

// ___________________________________.env file for jwt key
require('dotenv').config();

// __________________________collect environment variable for production and database
const { NODE_ENV, DATABASE } = process.env;

// ______________________________________________________connect to database
mongoose.connect(NODE_ENV === 'production' ? DATABASE : 'mongodb://localhost:27017/newsexplorerdb');

// ___________________________________________application
const app = express();

// ________________________________________________imports
// const auth = require('./middleware/auth');
// const { login, createUser } = require('./controllers/user');
// const userRouter = require('./routes/user');
// const articleRouter = require('./routes/article');
// const { NotFoundError } = require('./middleware/errors/notFoundError');
const { errorLogger } = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

// ___________________________________________PORT
const { PORT = 3000 } = process.env;

// ________________________function for email validation
// const validateEmail = (string) => {
//   if (!validator.isEmail(string)) {
//     throw new Error('Invalid email');
//   }
//   return string;
// };

// ________________________________limiter function to prevent too many server requests
app.set('trust proxy', 1); // for proxy service Heroku

const limiter = rateLimit({
  windowsMS: 15 * 60 * 1000,
  max: 100,
});

// _________________________________Setup for app variable
app.use(express.json());

app.use(express.urlencoded());

app.use(helmet());

app.use(limiter);

// ROUTES_________________________________________________________________________ROUTES

app.use(index);
// app.use(requestLogger); // log all requests from following routes

// app.post('/signup', celebrate({
//   body: Joi.object().keys({
//     email: Joi.string().required().custom(validateEmail),
//     password: Joi.string().required(),
//   }),
// }), createUser);

// app.post('/signin', celebrate({
//   body: Joi.object().keys({
//     email: Joi.string().required().custom(validateEmail),
//     password: Joi.string().required(),
//   }),
// }), login);

// // __________________________________________Routes requiring authorization
// app.use(auth);

// app.use(userRouter);
// app.use(articleRouter);

// app.get('*', () => {
//   throw new NotFoundError('Requested resource not found');
// });

// Errors_______________________________________________________________________Errors
app.use(errorLogger);

// _____________error handler for sending errors to the client produced by celebrate
app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App is listening at port ${PORT}`);
});
