const db = require("../../db/main");
const generateJwt = require("../../lib/jwt");
const authenticationHandler = async (req, res) => {
  try {
    
    const {email:emailReq, password} = typeof req.body === 'object' ? req.body :JSON.parse({
      email: req.body.email,
      password: req.body.password,
    });

    const dbRequest = await db({email,password});
    const { searchUser, email = null } = await dbRequest.searchUser;
    if (searchUser) {
      const { password } = doc;
      dbRequest.authenticationHandler = { password, email };
      const { userAuthenticated, userData } =
        await dbRequest.authenticationHandler;
      if (userAuthenticated) {
        return res.status(200).json(userData);
      }
      return res.status(403).json(await dbRequest.authenticationHandler);
    }
  } catch (e) {
    console.log(e)
  }
};

module.exports = authenticationHandler;
