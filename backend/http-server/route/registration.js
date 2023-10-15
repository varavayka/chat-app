const { Router } = require("express");

const registrationHandler = require("../controllers/registration");

const router = Router();

router.post("/", registrationHandler);
module.exports = router;
