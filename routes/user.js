const router = require('express').Router();

const { getCurrentUser } = require('../controllers/user');

// ROUTES_________________________________________________________________________ROUTES
router.get('/users/me', getCurrentUser);

module.exports = router;
