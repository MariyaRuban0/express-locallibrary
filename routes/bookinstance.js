const express = require("express");
const router = express.Router();

// Підключаємо контролер екземплярів книг
const bookInstanceController = require("../controllers/bookinstanceController");

// Список всіх екземплярів книг
router.get("/", bookInstanceController.bookinstance_list);

// Поки що не реалізовано інші, але можна додати пізніше
module.exports = router;
