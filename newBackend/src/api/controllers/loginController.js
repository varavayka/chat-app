

const {createUser, matchPassword,updateUser, checkToken} = require('../services/userService')
const authService = require('../services/authService')
async function loginController(req,res, next) {
    const {loginMethod} = req.params
    const {body} = req
    

    switch(loginMethod) {

        case 'registration':
           const {userCreated, userFinded, error} = await createUser(body)
           return res.status(!userCreated || userFinded ? 401 : 200).json( userFinded ? {userFinded} : {userCreated})
        case 'authentication':
            const {email, password} = body
            const {token, userAuthenticated} = await matchPassword({email}, password)
            if(userAuthenticated) await updateUser({email}, {token})
            res.status(!userAuthenticated ? 403 : 200).json({token, userAuthenticated})
            break
        
        case 'authorization':
            const {authorization} = req.headers
            const tokenFromRequest = authorization.split(' ')[1]
            const {tokenFound, secret} = await checkToken({token: tokenFromRequest})
            if(tokenFound) {
               const {userAuthorized}  = authService.verificationToken(tokenFromRequest, secret)
               return res.status(!userAuthorized ? 403 : 200).json({userAuthorized})
            }
            return res.status(403).json({tokenFound: !!tokenFound})
        
        default:
            res.status(400).json({pageFound:false})

    }
}

module.exports = loginController
