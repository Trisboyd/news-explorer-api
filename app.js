// VARIABLES_____________________________________________________________VARIABLES

// ___________________________________________modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const helmet = require('helmet');
const mainRouter = require('./routes/index');

// ___________________________________.env file for jwt key
require('dotenv').config();

// __________________________collect environment variable for production and database

// this variable works for google cloud
// const { DATABASE } = process.env;

// this variable for HEROKU
const { MONGODB_URI } = process.env;

// ______________________________________________________connect to database
mongoose.connect('mongodb+srv://Trisboyd:ju257ly7@newsuserinfo.mwocs.mongodb.net/NewsUserInfo?retryWrites=true&w=majority');

// ___________________________________________application
const app = express();

// ________________________________________________imports
const { errorLogger } = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const limiter = require('./utilities/limiter');

// ___________________________________________PORT
const { PORT = 3000 } = process.env;

// ________________________________limiter function to prevent too many server requests
app.set('trust proxy', 1); // for proxy service Heroku

// ____________________________________________________Setup for app variable
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(helmet());

// ___________________________________________CORS
app.use(cors());
app.options('*', cors());

// ROUTES_________________________________________________________________________ROUTES

app.use('/', mainRouter);

// ________________________________limit amount of server requests to prevent overload
app.use(limiter);

// Errors_______________________________________________________________________Errors
app.use(errorLogger);

// _____________error handler for sending errors to the client produced by celebrate
app.use(errors());

app.use(errorHandler);

app.listen(process.env.PORT || PORT, () => {
  console.log(`App is listening at port ${PORT}`);
});
