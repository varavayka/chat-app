const { Router } = require("express");
const rootRoute = require("./route/root");
const messengerRoute = require("./route/messenger");
const registrationRoute = require("./route/registration");
const authenticationRoute = require("./route/authentication");
const userSearchRoute = require('./route/userSearch')
const logoutRoute = require('./route/logout')
const validator = require("../middleware/validator");

const authorization = require("../middleware/authorization");
const router = Router();

router.use("/", /*[(data) => console.log(data)] таким образом можно записывать middleware*/ rootRoute);
// router.use("/api/authorization", authorization, accountRoute);
router.use("/messenger", authorization, messengerRoute);
router.use("/authentication", authenticationRoute);
router.use("/registration", validator, registrationRoute);
router.use('/logout', logoutRoute)
router.use('/search', authorization, userSearchRoute)

module.exports = router;
