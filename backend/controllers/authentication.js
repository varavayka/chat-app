const { validationResult } = require("express-validator");
const db = require("../db/main");
const { secretKey, signToken } = require("../lib/generateJwt");
const typeBody = require('../lib/typeBody')
const authenticationHandler = async (req, res) => {
  try {
    const validCredentials = validationResult(req);
    if (!validCredentials.isEmpty()) {
      return res.status(400).json(validCredentials);
    }
    const { password,email } = typeBody(req)
    const databaseQuery = await db({ email, password });
    const {searchUser} = await databaseQuery.searchUser

    if(searchUser) {
      databaseQuery.authenticationHandler = {email,password}
      const{ userAuthenticated, userData } = await databaseQuery.authenticationHandler;
      
      if(userAuthenticated) {
        const {jwt, secret} = await signToken(userData, await secretKey(256),'1d')
        databaseQuery.updateUserDoc = {jwt: await jwt,secretJwt: await secret, email}
        return res.status(200).json({jwt: await jwt,email})
      }
      return res.status(403).json(await dbRequest.authenticationHandler);
    }
    return res.status(403).json({ userSearch: false });
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = authenticationHandler;

