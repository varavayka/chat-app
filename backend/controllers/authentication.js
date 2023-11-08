const { validationResult } = require("express-validator");
const db = require("../db/main")();
const typeBody = require("../lib/typeBody");
const sendResponse = require('../lib/sendResponse')
const authenticationHandler = async (req, res) => {
  console.log(req.body)
  try {
    const validCredentials = validationResult(req);
    if (!validCredentials.isEmpty()) {
      return res.status(400).json(validCredentials);
    }
    const { password, email } = typeBody(req);
    const { authentication, findDoc} = await db;
    const { userAuthenticated, resultFindUser, jwt } = await authentication( await findDoc({ email }), password);

    switch(true) {
      case resultFindUser:
        return sendResponse(userAuthenticated, res, {  jwt, userAuthenticated })
      case !resultFindUser:
        return res.status(403).json({ resultFindUser })
      default:
        return res.status(403).json({ resultFindUser })

    }

  } catch (e) {
    console.log(e);
  }
};

module.exports = authenticationHandler;

