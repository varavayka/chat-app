const {Router} = require('express')
const loginController = require('../../controllers/loginController')
const route = Router()


route.post('/:loginMethod', loginController)


module.exports = route
