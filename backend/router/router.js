const { Router } = require("express");
const rootRoute = require("./route/root");
const accountRoute = require("./route/account");
const messengerRoute = require("./route/messenger");
const registrationRoute = require("./route/registration");
const authenticationRoute = require("./route/authentication");
const authorization = require("../middleware/authorization");
const validator = require("../middleware/validator");
const router = Router();

router.use(
  "/",
  /*[(data) => console.log(data)] таким образом можно записывать middleware*/ rootRoute
);
router.use("/api/authorization", authorization, accountRoute);
router.use("/messenger", authorization, messengerRoute);
router.use("/authentication", authenticationRoute);
router.use("/registration", validator, registrationRoute);
module.exports = router;
