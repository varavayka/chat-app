const { Router } = require("express");

const userSearch = require("../../controllers/userSearch");

const router = Router();

router.get("/", userSearch);

module.exports = router;
