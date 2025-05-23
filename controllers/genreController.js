/*const Genre = require("../models/genre");
const asyncHandler = require("express-async-handler");

// Display list of all Genres.
exports.genre_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre list");
});

// Display detail page for a specific Genre.
exports.genre_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Genre detail: ${req.params.id}`);
});

// Display Genre create form on GET.
exports.genre_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre create GET");
});

// Handle Genre create on POST.
exports.genre_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre create POST");
});

// Display Genre delete form on GET.
exports.genre_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre delete GET");
});

// Handle Genre delete on POST.
exports.genre_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre delete POST");
});

// Display Genre update form on GET.
exports.genre_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre update GET");
});

// Handle Genre update on POST.
exports.genre_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre update POST");
});
const Genre = require("../models/genre");
const asyncHandler = require("express-async-handler");
const Book = require("../models/book");//додала

/*Display list of all Genres.
exports.genre_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre list");
});


exports.genre_list = asyncHandler(async (req, res, next) => {
  const allGenres = await Genre.find().sort({ name: 1 }).exec();

  res.render("genre_list", {
    title: "Список жанрів",
    genre_list: allGenres,
  });
});

// Display detail page for a specific Genre.
exports.genre_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Genre detail: ${req.params.id}`);
});

// Display Genre create form on GET.
exports.genre_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre create GET");
});

// Handle Genre create on POST.
exports.genre_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre create POST");
});

// Display Genre delete form on GET.
exports.genre_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre delete GET");
});

// Handle Genre delete on POST.
exports.genre_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre delete POST");
});

// Display Genre update form on GET.
exports.genre_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre update GET");
});

// Handle Genre update on POST.
exports.genre_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre update POST");
});
*

////////////////////////////////////////////////////////////
const Genre = require("../models/genre");
const Book = require("../models/book");
const asyncHandler = require("express-async-handler");

// ✅ Вивести список всіх жанрів
exports.genre_list = asyncHandler(async (req, res, next) => {
  const allGenres = await Genre.find().sort({ name: 1 }).exec();

  res.render("genre_list", {
    title: "Список жанрів",
    genre_list: allGenres,
  });
});

// ✅ Вивести сторінку деталей жанру
exports.genre_detail = asyncHandler(async (req, res, next) => {
  const [genre, booksInGenre] = await Promise.all([
    Genre.findById(req.params.id).exec(),
    Book.find({ genre: req.params.id }, "title summary").exec(),
  ]);

  if (genre === null) {
    const err = new Error("Жанр не знайдено");
    err.status = 404;
    return next(err);
  }

  res.render("genre_detail", {
    title: "Деталі жанру",
    genre: genre,
    genre_books: booksInGenre,
  });
});

// 🔧 Форма створення жанру (GET)
exports.genre_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre create GET");
});

// 🔧 Обробка створення жанру (POST)
exports.genre_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre create POST");
});

// 🔧 Форма видалення жанру (GET)
exports.genre_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre delete GET");
});

// 🔧 Обробка видалення жанру (POST)
exports.genre_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre delete POST");
});

// 🔧 Форма редагування жанру (GET)
exports.genre_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre update GET");
});

// 🔧 Обробка редагування жанру (POST)
exports.genre_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre update POST");
});///////////////////////////////////////////////////*/
const Genre = require("../models/genre");
const Book = require("../models/book");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Вивести список всіх жанрів
exports.genre_list = asyncHandler(async (req, res, next) => {
  const allGenres = await Genre.find().sort({ name: 1 }).exec();

  res.render("genre_list", {
    title: "Список жанрів",
    genre_list: allGenres,
  });
});

// Вивести сторінку деталей жанру
exports.genre_detail = asyncHandler(async (req, res, next) => {
  const [genre, booksInGenre] = await Promise.all([
    Genre.findById(req.params.id).exec(),
    Book.find({ genre: req.params.id }, "title summary").exec(),
  ]);

  if (genre === null) {
    const err = new Error("Жанр не знайдено");
    err.status = 404;
    return next(err);
  }

  res.render("genre_detail", {
    title: "Деталі жанру",
    genre: genre,
    genre_books: booksInGenre,
  });
});

// Форма створення жанру (GET)
exports.genre_create_get = asyncHandler(async (req, res, next) => {
  res.render("genre_form", { title: "Створити жанр" });
});

// Обробка створення жанру (POST)
exports.genre_create_post = [
  // Валідація і очищення поля name
  body("name")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Назва жанру повинна містити принаймні 3 символи.")
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const genre = new Genre({ name: req.body.name });

    if (!errors.isEmpty()) {
      // Є помилки — повторно показати форму з помилками
      res.render("genre_form", {
        title: "Створити жанр",
        genre: genre,
        errors: errors.array(),
      });
      return;
    } else {
      // Перевірити, чи жанр вже існує
      const existingGenre = await Genre.findOne({
        name: req.body.name,
      }).collation({ locale: "en", strength: 2 });

      if (existingGenre) {
        // Якщо жанр існує — редірект на його сторінку
        res.redirect(existingGenre.url);
      } else {
        await genre.save();
        res.redirect(genre.url);
      }
    }
  }),
];

// Форма видалення жанру (GET)
exports.genre_delete_get = asyncHandler(async (req, res, next) => {
  const [genre, genre_books] = await Promise.all([
    Genre.findById(req.params.id).exec(),
    Book.find({ genre: req.params.id }).exec(),
  ]);

  if (genre === null) {
    // Якщо жанр не знайдено, перенаправити на список жанрів
    res.redirect("/catalog/genres");
    return;
  }

  res.render("genre_delete", {
    title: "Видалення жанру",
    genre: genre,
    genre_books: genre_books,
  });
});

// Обробка видалення жанру (POST)
exports.genre_delete_post = asyncHandler(async (req, res, next) => {
  const [genre, genre_books] = await Promise.all([
    Genre.findById(req.body.genreid).exec(),
    Book.find({ genre: req.body.genreid }).exec(),
  ]);

  if (genre_books.length > 0) {
    // Якщо у жанру є книги — знову показати форму видалення з повідомленням
    res.render("genre_delete", {
      title: "Видалення жанру",
      genre: genre,
      genre_books: genre_books,
    });
    return;
  } else {
    // Якщо немає книг — видалити жанр
    await Genre.findByIdAndRemove(req.body.genreid);
    res.redirect("/catalog/genres");
  }
});

// Форма редагування жанру (GET)
exports.genre_update_get = asyncHandler(async (req, res, next) => {
  const genre = await Genre.findById(req.params.id).exec();

  if (genre === null) {
    const err = new Error("Жанр не знайдено");
    err.status = 404;
    return next(err);
  }

  res.render("genre_form", {
    title: "Редагувати жанр",
    genre: genre,
  });
});

// Обробка редагування жанру (POST)
exports.genre_update_post = [
  // Валідація і очищення поля name
  body("name")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Назва жанру повинна містити принаймні 3 символи.")
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const genre = new Genre({
      name: req.body.name,
      _id: req.params.id, // важливо зберегти id для оновлення
    });

    if (!errors.isEmpty()) {
      // Є помилки — показати форму повторно
      res.render("genre_form", {
        title: "Редагувати жанр",
        genre: genre,
        errors: errors.array(),
      });
      return;
    } else {
      // Оновити жанр
      const updatedGenre = await Genre.findByIdAndUpdate(req.params.id, genre, {
        new: true,
      });
      res.redirect(updatedGenre.url);
    }
  }),
];


