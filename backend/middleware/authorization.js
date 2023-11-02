const { verifyJwt } = require("../lib/generateJwt");
const db = require("../db/main")();
const authorizationHandler = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    
    const tokenRequest = authorization.split(" ")[1];
    const {checkToken,findDoc} = await db;
    
    const { tokenFound, secretJwt } = await checkToken(await findDoc({jwt:tokenRequest}))

    if (tokenFound) {
      const verification = await verifyJwt(tokenRequest, secretJwt);
      if (verification.authorized) {
        // res.status(200).json({ userAuthorized: true });
        return next();
      }
      if (!verification.authorized) {
        return res.status(401).json({ verification });
      }
    }

    return res.status(401).json({ verification});
  } catch (e) {
    console.log(e.message)
    // return res.status(401).json({ userAuthorized: false });
  }
};
module.exports = authorizationHandler;