const { Router } = require("express");

const accountHandler = require("../controllers/account");

const router = Router();
router.post("/", accountHandler);

module.exports = router;
