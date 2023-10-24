const { validationResult } = require("express-validator");
const db = require("../../db/main");
const generateJwt = require("../../lib/jwt");
const authenticationHandler = async (req, res) => {
  try {
    const checkValidCredentials = validationResult(req);
    if (!checkValidCredentials.isEmpty()) {
      return res.status(400).json(checkValidCredentials);
    }
    const {password} = typeof req.body === 'object' ? req.body :JSON.parse({
      email: req.body.email,
      password: req.body.password,
    });
    const dbRequest = await db({email:req.body.email,password});
    
    const { searchUser, email = null } = await dbRequest.searchUser;
    if (searchUser) {
      dbRequest.authenticationHandler = { password, email };
      const { userAuthenticated, userData } =
        await dbRequest.authenticationHandler;
      if (userAuthenticated) {
       return  (async() => {
          const {jwt, secretJwt} = await generateJwt({...userData, lifeTimeToken: '24h'});
          dbRequest.updateUserDoc = {jwt, secretJwt , email}
         
          res.status(200).json({jwt,uuid:userData.id})
        })()
        
      }
      return res.status(403).json(await dbRequest.authenticationHandler);
    }
  } catch (e) {
    console.log(e)
  }
};

module.exports = authenticationHandler;
