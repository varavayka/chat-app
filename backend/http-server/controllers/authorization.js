const jwt = require("jsonwebtoken");
const db = require("../../db/main");
const authorizationHandler = async (req, res, next) => {
  try {
    const dbToken = await db({});
    const { authorization } = req.headers;
    const tokenRequest = authorization.split(" ")[1];
    dbToken.checkTokenRequest = req.body;
    const secret = (await dbToken.checkTokenRequest).secretJwt;
    jwt.verify(tokenRequest, secret, (err, result) => {
      if (err)
        return res
          .status(403)
          .json({
            message: e.message,
            authorization: false,
            userMessage: "Учетная запись не авторизирована",
          });
      return next();
    });
  } catch (e) {
    return res
      .status(403)
      .json({
        message: e.message,
        authorization: false,
        userMessage: "Учетная запись не авторизирована",
      });
  }
};
module.exports = authorizationHandler;
