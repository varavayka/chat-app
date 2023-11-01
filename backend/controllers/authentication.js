const { validationResult } = require("express-validator");
const db = require("../db/main");
const { secretKey, signToken } = require("../lib/generateJwt");
const typeBody = require("../lib/typeBody");
const authenticationHandler = async (req, res) => {
  try {
    const validCredentials = validationResult(req);
    if (!validCredentials.isEmpty()) {
      return res.status(400).json(validCredentials);
    }
    const { password, email } = typeBody(req);
    const databaseQuery = await db();
    const { resultFindUser } = await databaseQuery.findAccount(email);

    if (resultFindUser) {
      const { userAuthenticated, data } = await databaseQuery.userAuthentication(password, email);

      if (userAuthenticated) {
        const { jwt, secret } = await signToken( data,await secretKey(256), "1h");
        await databaseQuery.updateUser({ jwt: await jwt, secret, email });
        return res.status(200).json({ jwt: await jwt, userSearch: true });
      }
      if (!userAuthenticated) {
        return res.status(403).json({ userAuthenticated });
      }
      return;
    }
    if (!resultFindUser) {
      return res.status(403).json({ resultFindUser });
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = authenticationHandler;
