/*const express = require('express');
const app = express();

// Маршрут для /users/cool/
app.get('/users/cool/', (req, res) => {
    res.send('You are so cool');
});

// Запуск сервера на порту 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

// GET домашньої сторінки.
router.get("/", function (req, res) {
    res.redirect("/catalog");
  });
  //////////////////////////////////////
  const express = require('express');
const router = express.Router();

router.get("/", function (req, res) {
  res.redirect("/catalog");
});

module.exports = router;
*/
const express = require('express');
const router = express.Router();

router.get("/", function (req, res) {
  res.redirect("/catalog");
});

router.get('/my-page', (req, res) => {
  res.render('my_page', {
    title: 'My route',
    items: ['Element 1', 'Element 2', 'Element 3']
  });
});

module.exports = router;

