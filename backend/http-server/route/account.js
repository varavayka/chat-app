const { Router } = require("express");

const accountHandler = require("../controllers/account");

const router = Router();

router.get("/", accountHandler);

module.exports = router;
