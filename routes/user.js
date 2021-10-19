const router = require('express').Router();

const { getUser } = require('../controllers/user');

// ROUTES_________________________________________________________________________ROUTES
router.get('/users/me', getUser);
