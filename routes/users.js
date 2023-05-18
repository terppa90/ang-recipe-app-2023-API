const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const userCon = require('../controllers/UserController'); // user-reittien kontrolleri

// käyttäjän login- ja rekisteröitymisreitit tulevat tähän

/* GET users listing. */
router.get('/', userCon.getUsers);

// get one user
router.get('/:id', userCon.getUser);

// users/register
router.post('/register', userCon.registerUser);

// LOGIN
// users/login
router.post('/login', userCon.loginUser);

module.exports = router;
