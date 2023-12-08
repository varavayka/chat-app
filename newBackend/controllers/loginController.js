const {apiRequestManagement} = require('../db/dbController')

function loginController(req,res, next) {
    const {loginMethod} = req.params
    
    const {body} = req

    switch(loginMethod) {
        case 'registration':
            apiRequestManagement.emit(loginMethod,  body , (responseDb) => res.status(200).json(responseDb))
            break
        
        case 'authentication':
            apiRequestManagement.emit(loginMethod,  body , (responseDb) => {
                const {userAuthenticated, findedUser} = responseDb
                if(!findedUser) {
                    return res.status(401).json(responseDb)
                }
                
                if(userAuthenticated) {
                    
                    console.log(responseDb)
                    return res.status(200).json(responseDb)
                }
                return res.status(403).json(responseDb)
            })
            break

        case 'authorization':
            const authorizationHeader = req.headers.authorization.split(' ')[1]
            apiRequestManagement.emit(loginMethod,  authorizationHeader, (responseDb) => {
                const {tokenFind} = responseDb
                
                if(tokenFind) {
                   const {valid} = responseDb
                   if(valid) {
                        return res.status(200).json(responseDb)
                   }
                   return res.status(403).json({valid})
                }

                return res.status(403).json({tokenFind})

            })
            break

        case 'logout':
            apiRequestManagement.emit(loginMethod,  authorizationHeader , (responseDb) => {
                const {userAuthorized} = responseDb
                
                if(!userAuthorized) {
                    return res.status(403).json(responseDb)
                }
                return res.status(200).json(responseDb)
            })
            break

        default:
            res.status(404).send("Станица не найдена 404")
            break
    }
}

module.exports = loginController
