/* UserController on Userin tietokantaoperaatiot
ja autentikaation sisältävä kontrolleri.

Se sisältää kaksi metodia: registerUser jolla
luodaan uusi käyttäjä kantaan ja loginUser jolla käyttäjä kirjataan sisään.
*/

const bcrypt = require('bcryptjs');
const User = require('../models/User.js');
const createToken = require('../createtoken.js');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validation');

const UserController = {
  // Haetaan kaikki käyttäjät
  getUsers: async (req, res) => {
    const users = await User.find({});
    res.status(200).json(users);
  },

  // Haetaan yksittäinen käyttäjä
  getUser: async (req, res) => {
    await User.findOne({ id: req.params._id }).then((user) => {
      res.status(200).json(user);
    });
  },

  // uuden käyttäjän rekisteröinti
  registerUser: async function (req, res, next) {
    // VALIDATE THE DATA
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Check if the user is already in the database
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('email already exists.');

    //Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    try {
      const savedUser = await user.save();
      res.send({ user: user._id });
    } catch (err) {
      res.status(400).send(err);
    }
  },
  // Kirjautuminen
  loginUser: async function (req, res, next) {
    // VALIDATE THE DATA
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    // Checking if the email exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Email not found.');
    // Password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Invalid password');
    // res.send('Logged in!');
    // Create and assign a token
    //auth-token
    const payload = {
      _id: user._id,
      username: user.username,
      email: user.email,
    };
    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '1h',
    });
    // res.header('token', token).send(token);
    res.json({ token });
  },
};

module.exports = UserController;
