
/*const express = require('express');
const connectDB = require('./db');
const queriesRouter = require("./routes/queries");

const app = express();

connectDB();

app.use("/queries", queriesRouter);  // тут все правильно

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
const mongoose = require("mongoose");
const Author = require("./models/author");
const Book = require("./models/book");

async function createTestData() {
  try {
    // Підключення до бази даних
    await mongoose.connect('mongodb://localhost:27017/yourdb', { useNewUrlParser: true, useUnifiedTopology: true });

    // Перевірка, чи існує автор, якщо немає, створюємо
    let author = await Author.findOne({ first_name: "Jim", family_name: "Jones" });
    if (!author) {
      author = new Author({
        first_name: "Jim",
        family_name: "Jones"
      });
      await author.save();
    }

    // Створюємо нову книгу
    const book = new Book({
      title: "Test with any name",
      author: author._id,  // Зв'язуємо книгу з автором
      summary: "This is a test book",
      isbn: "123-456-789",
      genre: [],  // Ви можете додавати жанри
    });

    // Зберігаємо книгу
    await book.save();
    console.log("Test data has been saved.");

    // Закриваємо з'єднання з базою
    mongoose.connection.close();
  } catch (error) {
    console.error("Error populating data:", error);
  }
}

createTestData();*
///////////////////////////////////
const mongoose = require("mongoose");
const Author = require("./models/author");
const Book = require("./models/book");

async function createTestData() {
  try {
    // Підключення до MongoDB
    await mongoose.connect('mongodb://localhost:27017/yourdb');
    console.log("Connected to MongoDB");

    // Перевірка, чи існує автор, якщо немає, створюємо
    let author = await Author.findOne({ first_name: "Jim", family_name: "Jones" });
    if (!author) {
      author = new Author({
        first_name: "Jim",
        family_name: "Jones",
        name: "Jim Jones" // Додаємо поле name
      });
      await author.save();
      console.log("Author saved:", author);
    }

    // Створюємо нову книгу
    const book = new Book({
      title: "Test with any name",
      author: author._id, // Зв'язуємо книгу з автором
      summary: "This is a test book",
      isbn: "123-456-789",
      genre: [],
    });

    // Зберігаємо книгу
    await book.save();
    console.log("Test data has been saved.");

    // Закриваємо з'єднання
    mongoose.connection.close();
  } catch (error) {
    console.error("Error populating data:", error);
  }
}

mongoose.connect('mongodb://localhost:27017/yourdb')
  .then(() => {
    createTestData();
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
  //////////////////////////////////////////////////////
  const express = require('express');
const mongoose = require("mongoose");
const Author = require("./models/author");
const Book = require("./models/book");
//
const catalogRouter = require("./routes/catalog"); // Імпорт маршрутів для "каталогу" сайту
//


const app = express();
const PORT = 3000;

// Налаштування Pug як шаблонізатора
app.set('view engine', 'pug');
app.set('views', './views');

//
app.use("/catalog", catalogRouter); // Додавання маршрутів каталогу до ланцюжка проміжного програмного забезпечення.
//

// Підключення до MongoDB
mongoose.connect('mongodb://localhost:27017/yourdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("✅ Connected to MongoDB");
  createTestData(); // Створення тестових даних після підключення
})
.catch((err) => {
  console.error("❌ MongoDB connection error:", err);
});

// Створення тестових даних
async function createTestData() {
  try {
    let author = await Author.findOne({ first_name: "Jim", family_name: "Jones" });

    if (!author) {
      author = new Author({
        first_name: "Jim",
        family_name: "Jones",
        name: "Jim Jones"
      });
      await author.save();
      console.log("✅ Author saved");
    }

    const existingBook = await Book.findOne({ title: "Test with any name" });
    if (!existingBook) {
      const book = new Book({
        title: "Test with any name",
        author: author._id,
        summary: "This is a test book",
        isbn: "123-456-789",
        genre: [],
      });

      await book.save();
      console.log("✅ Test book saved");
    }
  } catch (err) {
    console.error("❌ Error saving test data:", err);
  }
}

// Роут для головної сторінки
app.get('/', async (req, res) => {
  try {
    const books = await Book.find().populate('author');
    res.render('index', { title: 'Список книг', books });
  } catch (err) {
    res.status(500).send("Помилка при завантаженні даних");
  }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
app.get('/queries/books', async (req, res) => {
  try {
    const books = await Book.find().populate('author');
    res.render('index', { title: 'Список книг', books });
  } catch (err) {
    console.error(err);
    res.status(500).send('Помилка сервера');
  }
});
////////////////////////////////////////////////////////////
const express = require('express');
const path = require('path');
const mongoose = require("mongoose");
const createError = require('http-errors');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const catalogRouter = require('./routes/catalog');

const Author = require("./models/author");
const Book = require("./models/book");

const app = express();
const PORT = 3000;

// Подключение к MongoDB
mongoose.connect('mongodb://localhost:27017/yourdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("✅ Connected to MongoDB");
  createTestData();
})
.catch((err) => {
  console.error("❌ MongoDB connection error:", err);
});

// Статические файлы
app.use(express.static(path.join(__dirname, 'public')));

// Мидлвары
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Установка Pug как шаблонизатора
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Роутери
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catalog', catalogRouter);

// Обработка 404 ошибок
app.use(function(req, res, next) {
  next(createError(404));
});

// Обработка других ошибок
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

// Создание тестовых данных
async function createTestData() {
  try {
    let author = await Author.findOne({ first_name: "Jim", family_name: "Jones" });

    if (!author) {
      author = new Author({
        first_name: "Jim",
        family_name: "Jones",
        name: "Jim Jones"
      });
      await author.save();
      console.log("✅ Author saved");
    }

    const existingBook = await Book.findOne({ title: "Test with any name" });
    if (!existingBook) {
      const book = new Book({
        title: "Test with any name",
        author: author._id,
        summary: "This is a test book",
        isbn: "123-456-789",
        genre: [],
      });

      await book.save();
      console.log("✅ Test book saved");
    }
  } catch (err) {
    console.error("❌ Error saving test data:", err);
  }
}

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
/////////////////////////////////////////////////////////////////
const express = require('express');
const path = require('path');
const mongoose = require("mongoose");
const createError = require('http-errors');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const catalogRouter = require('./routes/catalog');
const bookinstanceRouter = require('./routes/bookinstance'); // ✅ ДОДАНО

const Author = require("./models/author");
const Book = require("./models/book");

const app = express();
const PORT = 3000;

/* Підключення до MongoDB
mongoose.connect('mongodb://localhost:27017/yourdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("✅ Connected to MongoDB");
  createTestData();
})
.catch((err) => {
  console.error("❌ MongoDB connection error:", err);
});
require('dotenv').config();
mongoose.connect('mongodb+srv://mruban:Allomiro232730@mariya.wurif.mongodb.net/?retryWrites=true&w=majority&appName=Mariya', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


// Статичні файли
app.use(express.static(path.join(__dirname, 'public')));

// Мідлвари
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Pug шаблони
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Роутери
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catalog', catalogRouter);
app.use('/catalog/bookinstances', bookinstanceRouter); // ✅ ДОДАНО

// Обробка 404
app.use(function(req, res, next) {
  next(createError(404));
});

// Обробка інших помилок
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

// Тестові дані
async function createTestData() {
  try {
    let author = await Author.findOne({ first_name: "Jim", family_name: "Jones" });

    if (!author) {
      author = new Author({
        first_name: "Jim",
        family_name: "Jones",
        name: "Jim Jones"
      });
      await author.save();
      console.log("✅ Author saved");
    }

    const existingBook = await Book.findOne({ title: "Test with any name" });
    if (!existingBook) {
      const book = new Book({
        title: "Test with any name",
        author: author._id,
        summary: "This is a test book",
        isbn: "123-456-789",
        genre: [],
      });

      await book.save();
      console.log("✅ Test book saved");
    }
  } catch (err) {
    console.error("❌ Error saving test data:", err);
  }
}

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
//////////////////////////////////////////////////////
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const createError = require('http-errors');
const logger = require('morgan');
require('dotenv').config(); // ✅ Завантажує змінні з .env

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const catalogRouter = require('./routes/catalog');
const bookinstanceRouter = require('./routes/bookinstance');

const Author = require("./models/author");
const Book = require("./models/book");

const app = express();
const PORT = 3000;

// ✅ Підключення до MongoDB через змінну середовища
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("✅ Connected to MongoDB");
  createTestData(); // Можеш прибрати, якщо не треба
})
.catch((err) => {
  console.error("❌ MongoDB connection error:", err);
});

// Статичні файли
app.use(express.static(path.join(__dirname, 'public')));

// Мідлвари
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Pug шаблони
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Роутери
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catalog', catalogRouter);
app.use('/catalog/bookinstances', bookinstanceRouter);

// Обробка 404
app.use(function(req, res, next) {
  next(createError(404));
});

// Обробка інших помилок
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

// Тестові дані
async function createTestData() {
  try {
    let author = await Author.findOne({ first_name: "Jim", family_name: "Jones" });

    if (!author) {
      author = new Author({
        first_name: "Jim",
        family_name: "Jones",
        name: "Jim Jones"
      });
      await author.save();
      console.log("✅ Author saved");
    }

    const existingBook = await Book.findOne({ title: "Test with any name" });
    if (!existingBook) {
      const book = new Book({
        title: "Test with any name",
        author: author._id,
        summary: "This is a test book",
        isbn: "123-456-789",
        genre: [],
      });

      await book.save();
      console.log("✅ Test book saved");
    }
  } catch (err) {
    console.error("❌ Error saving test data:", err);
  }
}

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});*//////////////////////////////////
////////////////////////////////////////////
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const createError = require('http-errors');
const logger = require('morgan');
const compression = require('compression');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const catalogRouter = require('./routes/catalog');
const bookinstanceRouter = require('./routes/bookinstance');

const Author = require("./models/author");
const Book = require("./models/book");

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("✅ Connected to MongoDB");
  createTestData();
})
.catch((err) => {
  console.error("❌ MongoDB connection error:", err);
});

// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.use(helmet());

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "script-src": ["'self'", "code.jquery.com", "cdn.jsdelivr.net"]
    }
  })
);

// Rate Limiting
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 20,
});
app.use(limiter);

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Pug template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Routers
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catalog', catalogRouter);
app.use('/catalog/bookinstances', bookinstanceRouter);

// 404 handler
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// Test data
async function createTestData() {
  try {
    let author = await Author.findOne({ first_name: "Jim", family_name: "Jones" });
    if (!author) {
      author = new Author({ first_name: "Jim", family_name: "Jones" });
      await author.save();
      console.log("✅ Author saved");
    }

    const existingBook = await Book.findOne({ title: "Test with any name" });
    if (!existingBook) {
      const book = new Book({
        title: "Test with any name",
        author: author._id,
        summary: "This is a test book",
        isbn: "123-456-789",
        genre: [],
      });
      await book.save();
      console.log("✅ Test book saved");
    }
  } catch (err) {
    console.error("❌ Error saving test data:", err);
  }
}

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});


