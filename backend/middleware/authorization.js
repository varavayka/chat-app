const qs  = require('qs')

const { verifyJwt } = require("../lib/generateJwt");
const db = require("../db/main")();
const authorizationHandler = async (req, res, next) => {
  
  try {
    const { authorization } = req.headers;
    let tokenRequest
    if(!authorization) {
      tokenRequest = req.query.token
    } else {
      tokenRequest = authorization.split(" ")[1] ;
    }

    const {checkToken,findDoc} = await db;
    
    const { tokenFound, secretJwt } = await checkToken(await findDoc({jwt:tokenRequest}))
    
    if (tokenFound) {
      
      const {authorized} = await verifyJwt(tokenRequest, secretJwt);
      if (authorized) {
        return next();
      }
      if (!authorized) {
        return res.status(401).json({ authorized });
      }
    }

    return res.status(401).json({tokenFound, message:'Пользователь не авторизирован'});
  } catch (e) {
    console.log(e.message)
    // return res.status(401).json({ userAuthorized: false });
  }
};
module.exports = authorizationHandler;