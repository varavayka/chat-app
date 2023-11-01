const { validationResult } = require("express-validator");

const db = require("../db/main");
const typeBody = require('../lib/typeBody')
const registrationHandler = async (req, res) => {
  try {
    const checkValidCredentials = validationResult(req);
    if (!checkValidCredentials.isEmpty()) {
      return res.status(400).json(checkValidCredentials);
    }

    const {email} = typeBody(req);
    const databaseQuery = await db();
    const { resultFindUser } = await databaseQuery.findAccount(email);

    if(!resultFindUser) {
      const { registrationStatus} = await databaseQuery.registrationCandidate(typeBody(req));
      if(registrationStatus) {
        return res.status(200).json({ registrationStatus});
      }
    }
    if(resultFindUser) {
      return res.status(401).json({registrationStatus: false});
    }
  } catch (e) {
    console.log(e.message)
  }
};

module.exports = registrationHandler;
