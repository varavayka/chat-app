const { Router } = require("express");

const messengerHandler = require("../../controllers/messenger");

const router = Router();

router.get("/", messengerHandler);
module.exports = router;
