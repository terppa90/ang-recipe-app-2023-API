const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
