const { check } = require("express-validator");


module.exports = [
    check("email", "Строка почты не может быть пустой").notEmpty(),
    check(
      "password",
      "Строка пароля не может быть меньше 8 и больше 15 символов"
    ).isLength({ min: 8, max: 15 }),
    check(
      "username",
      "Строка имени не может быть меньше 5 и больше 10"
    ).isLength({ min: 5, max: 10 }),
  ];