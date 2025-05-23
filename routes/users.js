/*const express = require('express');
const router = express.Router();

// Створення маршруту для /users/cool
router.get('/cool', (req, res) => {
  res.send('You are so cool');
});

module.exports = router;*/
///////////////////
const express = require('express');
const router = express.Router();

// /users/cool
router.get('/cool', (req, res) => {
  res.send('You are so cool');
});

module.exports = router;

