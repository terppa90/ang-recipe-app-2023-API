const mongoose = require('mongoose');
const express = require('express');
const app = express();
require('dotenv').config(); //dotenv -moduuli tarvitaan jos aiotaan käyttää .env -filua

// yhteydenotto MongoDB Atlas -kantaan:

const connectDB = async () => {
  await mongoose
    .connect(
      'mongodb+srv://admin:admin@recipe-api.ivbpifx.mongodb.net/Recipe?retryWrites=true&w=majority'
    )
    .then(() => {
      console.log('Connected to MongoDB');
      app.listen(3000, () => {
        console.log(`Node API app is running on port 3000`);
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
module.exports = connectDB;
/*
mongoose.connect(
  process.env.DB_CONNECTION_STRING,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (req, res) => {
    console.log('Connected to the database');
  }
);
*/
/*
mongoose
  .connect(
    'mongodb+srv://terppa:<Lcftrp666>@reseptit.nuned.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log('connected to DB.'))
  .catch((err) => console.log(err));
  */
