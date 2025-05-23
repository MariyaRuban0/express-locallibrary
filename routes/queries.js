/*const express = require("express");
const router = express.Router();
const Author = require("../models/author"); // Імпортуємо модель

 GET author. 
router.get('/author', async function (req, res, next) {
  const firstName = req.query["first_name"];
  const familyName = req.query["family_name"];

  // Формуємо динамічний запит
  let query = {};
  if (firstName) query.first_name = new RegExp(firstName, "i");
  if (familyName) query.family_name = new RegExp(familyName, "i");

  try {
    const authors = await Author.find(query); // Шукаємо за умовами

    let result = "";
    if (authors.length > 0) {
      result = `<ul>${authors.map((author) => `<li>${author.name}</li>`).join("")}</ul>`;
    } else {
      result = "<h1>Not found</h1>";
    }

    res.send(result);
  } catch (err) {
    next(err); // Обробка помилок
  }
});

module.exports = router;
const express = require("express");
const router = express.Router();
const Author = require("../models/author"); // Імпортуємо модель

/* GET author. 
router.get('/author', async function (req, res, next) {
  const firstName = req.query["first_name"];
  const familyName = req.query["family_name"];

  // Формуємо динамічний запит
  let query = {};
  if (firstName) query.first_name = new RegExp(firstName, "i");
  if (familyName) query.family_name = new RegExp(familyName, "i");

  try {
    const authors = await Author.find(query); // Шукаємо за умовами

    console.log("Authors found: ", authors); // Додаємо лог для перевірки

    let result = "";
    if (authors.length > 0) {
      result = `<ul>${authors.map((author) => `<li>${author.name}</li>`).join("")}</ul>`;
    } else {
      result = "<h1>Not found</h1>";
    }

    res.send(result);
  } catch (err) {
    next(err); // Обробка помилок
  }
});

module.exports = router;
const express = require("express");
const router = express.Router();
const Author = require("../models/author"); // Імпортуємо модель

/* GET author. 
router.get('/author', async function (req, res, next) {
  const firstName = req.query["first_name"];
  const familyName = req.query["family_name"];

  // Формуємо динамічний запит
  let query = {};
  if (firstName) query.first_name = new RegExp(firstName, "i");
  if (familyName) query.family_name = new RegExp(familyName, "i");

  try {
    const authors = await Author.find(query); // Шукаємо за умовами

    console.log("Authors found: ", authors); // Лог для перевірки

    let result = "";
    if (authors.length > 0) {
      result = `<ul>${authors.map((author) => `<li>${author.first_name} ${author.family_name}</li>`).join("")}</ul>`;
    } else {
      result = "<h1>Not found</h1>";
    }

    res.send(result);
  } catch (err) {
    next(err); // Обробка помилок
  }
});

module.exports = router;
const express = require("express");
const router = express.Router();
const Author = require("../models/author"); // Імпортуємо модель для авторів
const Book = require("../models/book"); // Імпортуємо модель для книг


/* GET author. 
router.get('/author', async function (req, res, next) {
  const firstName = req.query["first_name"];
  const familyName = req.query["family_name"];

  // Формуємо динамічний запит
  let query = {};
  if (firstName) query.first_name = new RegExp(firstName, "i");
  if (familyName) query.family_name = new RegExp(familyName, "i");

  try {
    const authors = await Author.find(query); // Шукаємо за умовами

    let result = "";
    if (authors.length > 0) {
      result = `<ul>${authors.map((author) => `<li>${author.first_name} ${author.family_name}</li>`).join("")}</ul>`;
    } else {
      result = "<h1>Not found</h1>";
    }

    res.send(result);
  } catch (err) {
    next(err); // Обробка помилок
  }
});

/* GET books. 
router.get('/books', async function (req, res, next) {
  const title = req.query["title"]; // Отримуємо параметр title

  // Формуємо динамічний запит
  let query = {};
  if (title) query.title = new RegExp(title, "i"); // Використовуємо регулярний вираз для пошуку по назві книги

  try {
    // Знаходимо книги за запитом і заповнюємо інформацію про автора
    const books = await Book.find(query).populate('author', 'first_name family_name'); // populate для отримання імені та прізвища автора

    let result = "";
    if (books.length > 0) {
      // Формуємо результат у вигляді списку книг
      result = `<ul>${books.map((book) => `<li>${book.title} by ${book.author.first_name} ${book.author.family_name}</li>`).join("")}</ul>`;
    } else {
      result = "<h1>Not found</h1>";
    }

    res.send(result);
  } catch (err) {
    next(err); // Обробка помилок
  }
});

module.exports = router;

//додала останный раз
/* GET books. 
router.get('/books', async function (req, res, next) {
  // Отримуємо query параметр "title" з URL
  const title = req.query["title"];
  
  // Формуємо query для пошуку за тайтлом, використовуючи регулярний вираз
  const query = { title: RegExp(title, "i") };
  
  try {
    // Знаходимо всі книги, які відповідають тайтлу
    const books = await Book.find(query).populate("author", "first_name family_name");

    // Формуємо результат
    let result = "";
    if (books.length > 0) {
      result = "<ul>" + books.map((book) => <li>${book.title} by ${book.author.first_name} ${book.author.family_name}</li>).join("") + "</ul>";
    } else {
      result = "<h1>Not found</h1>";
    }
    // Відправляємо результат у відповідь
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("<h1>Internal server error</h1>");
  }
});///////////////////////
const express = require("express");
const router = express.Router();
const Author = require("../models/author");
const Book = require("../models/book");

/* GET author. 
router.get('/author', async function (req, res, next) {
  const firstName = req.query["first_name"];
  const familyName = req.query["family_name"];

  let query = {};
  if (firstName) query.first_name = new RegExp(firstName, "i");
  if (familyName) query.family_name = new RegExp(familyName, "i");

  try {
    const authors = await Author.find(query);
    let result = "";
    if (authors.length > 0) {
      result = `<ul>${authors.map((author) =>
        `<li>${author.first_name} ${author.family_name}</li>`).join("")}</ul>`;
    } else {
      result = "<h1>Not found</h1>";
    }
    res.send(result);
  } catch (err) {
    next(err);
  }
});

/* GET books. 
router.get('/books', async function (req, res, next) {
  const title = req.query["title"];

  const query = { title: new RegExp(title, "i") };

  try {
    // Знаходимо книги за запитом та заповнюємо автора
    const books = await Book.find(query).populate('author', 'first_name family_name');
    let result = "";
    if (books.length > 0) {
      result = `<ul>${books.map((book) =>
        `<li>${book.title} by ${book.author.first_name} ${book.author.family_name}</li>`).join("")}</ul>`;
    } else {
      result = "<h1>Not found</h1>";
    }
    res.send(result);
  } catch (err) {
    next(err);
  }
});

module.exports = router;*/
const express = require('express');
const router = express.Router();
const Book = require('../models/book'); // Імпортуємо модель Book

/* GET books by title */
router.get('/books', async function (req, res, next) {
  const titleQuery = req.query["title"];
  if (!titleQuery) {
    return res.send("<h1>Please provide a title query</h1>");
  }

  const query = { title: new RegExp(titleQuery, "i") };

  try {
    const books = await Book.find(query).populate("author");

    if (books.length === 0) {
      return res.send("<h1>No books found</h1>");
    }

    let result = `<ul>${books.map(book => 
      `<li>${book.title} by ${book.author.first_name} ${book.author.family_name}</li>`
    ).join("")}</ul>`;

    res.send(result);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;







