const jwt = require('jsonwebtoken');
const AuthError = require('./errors/authError');
const authError = require('../utilities/errorMessages/authError');

// ___________________________________________access secret key in environment variable
const { NODE_ENV, JWT_SECRET } = process.env;

const handleAuthError = () => {
  throw new AuthError(authError);
};

// eslint-disable-next-line consistent-return
const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError();
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key');
  } catch (err) {
    return handleAuthError();
  }

  req.user = payload;

  next();
};

module.exports = auth;
