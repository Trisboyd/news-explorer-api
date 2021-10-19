const User = require('../models/user');

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
  .then((user) => {
    if (!user) {
      throw new NotFoundError('User does not exist');
    } else {
      return res.send({ user });
    }
  })
  .catch(console.log(req), next);
};
