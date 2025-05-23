/*var express = require('express');
var app = express();

// Простий маршрут для перевірки
app.get('/', function(req, res) {
  res.send('Hello World!');
});

module.exports = app;*/
const mongoose = require("mongoose");
const Author = require("./models/author");
const Book = require("./models/book");

async function createTestData() {
  try {
    // Підключення до MongoDB без параметрів useNewUrlParser та useUnifiedTopology
    await mongoose.connect('mongodb://localhost:27017/yourdb');
    console.log("Connected to MongoDB");

    // Перевірка, чи існує автор, якщо немає, створюємо
    let author = await Author.findOne({ first_name: "Jim", family_name: "Jones" });
    if (!author) {
      author = new Author({
        first_name: "Jim",
        family_name: "Jones"
      });
      await author.save();
      console.log("Author saved:", author);
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

    // Закриваємо з'єднання з MongoDB
    mongoose.connection.close();
  } catch (error) {
    console.error("Error populating data:", error);
  }
}

// Спочатку підключаємося до MongoDB
mongoose.connect('mongodb://localhost:27017/yourdb')
  .then(() => {
    createTestData(); // Викликаємо функцію після успішного підключення
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
