const {createUser} = require('../services/userService')
const authService = require('../services/authService')
async function loginController(req,res, next) {
    const {loginMethod} = req.params
    const {body} = req
    

    switch(loginMethod) {

        case 'registration':
           const {userCreated, userFinded, error} = await createUser(body)
           return res.status(!userCreated || userFinded ? 401 : 200).json( userFinded ? {userFinded} : {userCreated})
        case 'authentication': 
            


    }
}

module.exports = loginController
