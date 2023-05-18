const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('../validation');
const userCon = require('../controllers/UserController');

const User = require('../models/User');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// users/register
router.post('/register', userCon.registerUser);

// LOGIN
// users/login
router.post('/login', userCon.loginUser);

module.exports = router;
