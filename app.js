const express = require('express');
const app = express();

const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');
const Recipe = require('./models/Recipe');
const User = require('./models/User');

const port = process.env.PORT || 3000;

const connectDB = require('./dbconnection');

require('dotenv').config(); //dotenv -moduuli tarvitaan jos aiotaan käyttää .env -filua
// connectDB();

//cors avaa yhteyden palvelinsovelluksen ja asiakassovelluksen välille
// jos nämä sijaitsevat eri palvelimilla

const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200,
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));

// Import routes
// const recipesRoute = require('./routes/recipes');
const usersRoute = require('./routes/users');
// const authRoute = require('./routes/auth');

// reittien käyttöönotto
// app.use('/recipes', recipesRoute);
//app.use('/users', usersRouter);
app.use('/users', usersRoute);
// app.use('/users', authRoute);
// Middleware
app.use(express.json());

// routes
//request and response
// app.get('/', (req, res) => {
//   res.send('Hello NODE API');
// });

app.get('/recipes', async (req, res) => {
  try {
    const recipes = await Recipe.find({});
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/recipes/:id', async (req, res) => {
  await Recipe.findOne({ id: req.params.id }).then((recipe) => {
    res.status(200).json(recipe);
  });
});

app.post('/recipes', async (req, res) => {
  await Recipe.create(req.body).then((recipe) => {
    res.status(200).json(recipe);
  });
});

// app.put('/recipes/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const recipe = await Recipe.findByIdAndUpdate(id, req.body);
//     if (!recipe) {
//       return res
//         .status(404)
//         .json({ message: `Cannot find any product with ID ${id}` });
//     }
//     const updatedRecipe = await Recipe.findById(id);
//     res.status(200).json(updatedRecipe);
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json({ message: error.message });
//   }
// });

// app.delete('/recipes/:id', async (req, res) => {
//   const { id } = req.params;
//   await Recipe.findByIdAndDelete(id).then((recipe) => {
//     res.status(200).json(recipe);
//   });
// });

app.delete('/recipes/:id', async (req, res) => {
  await Recipe.deleteOne({ id: req.params.id }).then((recipe) => {
    res.status(200).json(recipe);
  });
});

// USER

/* GET users listing. */
// app.get('/users', async (req, res) => {
//   try {
//     const users = await User.find({});
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// app.get('/users/:id', async (req, res) => {
//   await User.findOne({ id: req.params._id }).then((user) => {
//     res.status(200).json(user);
//   });
// });

// Register
// app.post('/users', async (req, res) => {
//   const hashedPassword = bcrypt.hashSync(req.body.password, 8);
//   await User.create({
//     username: req.body.username,
//     password: hashedPassword,
//     isadmin: req.body.isadmin,
//   }).then((user) => {
//     res.status(200).json(user);
//   });
// });

// Login

mongoose
  .connect(
    'mongodb+srv://admin:admin@recipe-api.ivbpifx.mongodb.net/Recipe?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Node API app is running on port 3000`);
    });
  })
  .catch(() => {
    console.log(error);
  });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
