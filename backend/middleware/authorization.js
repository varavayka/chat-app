const { verifyJwt } = require("../lib/generateJwt");
const db = require("../db/main");
const authorizationHandler = async (req, res, next) => {
  try {
    
    const { authorization } = req.headers;
    const tokenRequest = authorization.split(" ")[1];
    const databaseQuery = await db();
    databaseQuery.checkTokenRequest = tokenRequest;
    const secret = await await databaseQuery.checkTokenRequest;
    if (secret.tokenFound) {
      const verification = await verifyJwt(tokenRequest, secret.secretJwt);

      if (verification.authorized) {
        return res.status(200).json({ userAuthorized: true });
      }
      if (!verification.authorized) {
        return res.status(403).json({ userAuthorized: false });
      }
    }
    
    return res.status(403).json({ userAuthorized: false });
  } catch (e) {
    return res.status(403).json({ userAuthorized: false });
  }
};
module.exports = authorizationHandler;
