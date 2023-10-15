const { Router } = require("express");

const authenticationHandler = require("../controllers/authentication");

const router = Router();

router.post("/", authenticationHandler);
module.exports = router;
