const { emailExists, server } = require('../utilities/errorMessages');

const errorHandler = (error, req, res, next) => {
  console.log(error);
  if (error.name === 'MongoServerError' && error.code === 11000) {
    res.status(409).send({ message: emailExists });
  }
  res.status(error.statusCode)
    .send({ message: (error.statusCode === 500) ? server : error.message });
  next();
};

module.exports = errorHandler;
