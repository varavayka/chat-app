const { Router } = require("express");
const loginController = require("../../controllers/loginController");
const {
  initFieldValidation,
  checkingValidationResult,
} = require("../../middleware/middlewareValidatior");
const fileds = ["email", "username", "shortname", "password"];
const validatorMessages = [
  { email: false, description: "некорректная почта" },
  { username: false, descripton: "пустое поле" },
  { shortname: false, description: "пустое поле" },
  { password: false, description: "пустое поле" },
];
const methodsVAlidation = ["isEmail", "notEmpty", "notEmpty", "notEmpty"];
const router = Router();

router.post(
  "/login/:loginMethod",
  initFieldValidation(fileds, validatorMessages, methodsVAlidation),
  checkingValidationResult,
  loginController
);
module.exports = router;
