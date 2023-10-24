const { Router } = require("express");
const { check } = require("express-validator");
const rootRoute = require("../route/root");
const accountRoute = require("../route/account");
const messengerRoute = require("../route/messenger");
const registrationRoute = require("../route/registration");
const authenticationRoute = require("../route/authentication");
const authorization = require('../controllers/authorization')
const router = Router();

router.use(
  "/",
  /*[(data) => console.log(data)] таким образом можно записывать middleware*/ rootRoute
);
router.use("/api/authorization", authorization, accountRoute);
router.use("/messenger", messengerRoute);
router.use("/authentication", authenticationRoute);
router.use(
  "/registration",
  [
   check("email", "Строка почты не может быть пустой").notEmpty(),
   check('password', 'Строка пароля не может быть меньше 8 и больше 15 символов').isLength({min: 8, max: 15}),
   check('username', 'Строка имени не может быть меньше 5 и больше 10').isLength({min: 5, max: 10}),



],
  registrationRoute
);

module.exports = router;
