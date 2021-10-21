const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AuthError = require('../middleware/errors/authError');

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
  .then((user) => {
    if (!user) {
      throw new NotFoundError('User does not exist'); //need to make middleware errors!!!!!!!!!!!!
    } else {
      return res.send({ user });
    }
  })
  .catch(console.log(req), next);
};

module.exports.createUser = (req,res, next) => {
  const { email, password } = req.body;
  bcrypt.hash(password, 10)
  .then((hash) => {
    User.create({ email, password: hash })
  })
  .then((user) => {
    if (!user) {
      throw new RequestError('Invalid email or password');
    }
    res.send({ _id: user._id, email: user.email })
  })
  .catch(next);
}

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
  .then((user) => {
    if (!user) {
      throw new AuthError('Invalid email or password')
    } else {
      const token = jwt.sign({ _id: user._id}, 'secret key', {expiresIn: '7d'});
      res.send({ token });
    }
  })
  .catch(next);
};