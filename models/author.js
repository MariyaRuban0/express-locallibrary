/*const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

// Віртуальне поле для повного імені автора
AuthorSchema.virtual("name").get(function () {
  // Щоб уникнути помилок у випадках, коли автор не має ні прізвища, ні імені
  // Ми хочемо переконатися, що ми обробляємо виняток, повертаючи порожній рядок для цього випадку
  let fullname = "";
  if (this.first_name && this.family_name) {
    fullname = `${this.family_name}, ${this.first_name}`;
  }

  return fullname;
});

// Віртуальне поле для URL автора
AuthorSchema.virtual("url").get(function () {
  // Ми не використовуємо стрілочну функцію, оскільки нам знадобиться об'єкт this
  return `/catalog/author/${this._id}`;
});

// Експортуємо модель
module.exports = mongoose.model("Author", AuthorSchema);*/
/* GET author. 
router.get('/author', async function (req, res, next) {
  const firstName = req.query["first_name"];

  if (!firstName) {
    return res.send("<h1>Будь ласка, передайте параметр first_name</h1>");
  }

  const query = { first_name: new RegExp(firstName, "i") };
  const authors = await Author.find(query);

  let result = "";
  if (authors.length > 0) {
    result = `<ul>${authors.map((author) => `<li>${author.name}</li>`).join("")}</ul>`;
  } else {
    result = "<h1>Not found</h1>";
  }
  res.send(result);
});

const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  family_name: { type: String, required: true },
  name: { type: String, required: true },
});

const Author = mongoose.model('Author', AuthorSchema);

module.exports = Author;
const mongoose = require('mongoose');
const { DateTime } = require('luxon'); // Для форматування дат

const AuthorSchema = new mongoose.Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

// Віртуальне поле для повного імені
AuthorSchema.virtual('name').get(function () {
  return `${this.family_name}, ${this.first_name}`;
});

// Віртуальне поле для URL
AuthorSchema.virtual('url').get(function () {
  return `/catalog/author/${this._id}`;
});

// Форматовані дати народження і смерті
AuthorSchema.virtual('date_of_birth_formatted').get(function () {
  return this.date_of_birth
    ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED)
    : '';
});

AuthorSchema.virtual('date_of_death_formatted').get(function () {
  return this.date_of_death
    ? DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED)
    : '';
});

const Author = mongoose.model('Author', AuthorSchema);

module.exports = Author;
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

// Віртуальне поле для повного імені
AuthorSchema.virtual('name').get(function() {
  return `${this.first_name} ${this.family_name}`;
});

// Віртуальне поле для URL
AuthorSchema.virtual('url').get(function() {
  return `/catalog/author/${this._id}`;
});

module.exports = mongoose.model('Author', AuthorSchema);*/



const mongoose = require('mongoose');
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

AuthorSchema.virtual('name').get(function() {
  return `${this.first_name} ${this.family_name}`;
});

AuthorSchema.virtual('url').get(function() {
  return `/catalog/author/${this._id}`;
});

AuthorSchema.virtual('lifespan').get(function () {
  const birth = this.date_of_birth ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED) : '';
  const death = this.date_of_death ? DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED) : '';
  return `${birth} - ${death}`;
});

module.exports = mongoose.model('Author', AuthorSchema);









