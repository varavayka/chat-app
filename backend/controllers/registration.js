const { validationResult } = require("express-validator");

const db = require("../db/main")();
const typeBody = require("../lib/typeBody");
const registrationHandler = async (req, res) => {
  try {
    const checkValidCredentials = validationResult(req);
    if (!checkValidCredentials.isEmpty()) {
      return res.status(400).json(checkValidCredentials);
    }
    const { registration, preparationCandidate, findDoc } = await db;
    const { email, ...other } = typeBody(req);
    const { registrationStatus } = await registration(
      await findDoc({ email }),
      await preparationCandidate({ ...other, email }, 256)
    );
    switch(true) {
      case registrationStatus:
        return res.status(200).json({ registrationStatus })
      case !registrationStatus:
        return res.status(401).json({ registrationStatus });
      default:
        return res.status(401).json({ registrationStatus });
    }
  } catch (e) {
    console.log(e.message);
  }
};
module.exports = registrationHandler;