const errorHandler = (error, req, res, next) => {
  console.log(error);
  if (error.name === 'MongoServerError' && error.code === 11000) {
    res.status(409).send('User email already exists');
  }
  res.status(error.statusCode)
    .send({ message: (error.statusCode === 500) ? 'An error occurred on the server' : error.message });
  next();
};

module.exports = errorHandler;
