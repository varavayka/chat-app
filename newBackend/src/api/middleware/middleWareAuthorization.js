
const {checkToken} = require('../services/userService')
const {verificationToken} = require('../services/authService')
async function messengerAuthorization(req, res, next) {
    const {authorization} = req.headers
    const tokenFromRequest = authorization.split(' ')[1]
    const {tokenFound, token, secret} = await checkToken({token: tokenFromRequest})
    if(tokenFound) {
      const {userAuthorized}   = verificationToken(token, secret)
      return !userAuthorized ? res.status(403).json({userAuthorized}) : next()
    }
    return res.status(403).json({tokenFound})
}

module.exports = messengerAuthorization