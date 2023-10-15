const { Router } = require("express");
const rootRoute = require("../route/root");
const accountRoute = require("../route/account");
const messengerRoute = require("../route/messenger");
const registrationRoute = require("../route/registration");
const authenticationRoute = require("../route/authentication");

const router = Router();

router.use("/", rootRoute);
router.use("/account", accountRoute);
router.use("/messenger", messengerRoute);
router.use("/authentication", authenticationRoute);
router.use("/registration", registrationRoute);

module.exports = router;
