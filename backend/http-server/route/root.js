const { Router } = require("express");

const rootHandler = require("../controllers/root");

const router = Router();

router.get("/", rootHandler);

module.exports = router;
