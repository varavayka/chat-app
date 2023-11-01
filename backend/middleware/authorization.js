const { verifyJwt } = require("../lib/generateJwt");
const db = require("../db/main");
const authorizationHandler = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const tokenRequest = authorization.split(" ")[1];
    const databaseQuery = await db();
    databaseQuery.checkTokenRequest = tokenRequest;
    const { tokenFound, secretJwt } = await databaseQuery.checkTokenRequest;
    
   

    if (tokenFound) {
      const verification = await verifyJwt(tokenRequest, secretJwt);
      if (verification.authorized) {
        res.status(200).json({ userAuthorized: true });
        return next();
      }
      if (!verification.authorized) {
        return res.status(401).json({ userAuthorized: false });
      }
      return;
    }

    return res.status(401).json({ userAuthorized: false });
  } catch (e) {
    console.log(e.message)
    // return res.status(401).json({ userAuthorized: false });
  }
};
module.exports = authorizationHandler;