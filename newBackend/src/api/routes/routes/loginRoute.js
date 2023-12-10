const {Router}  = require('express')
const loginController = require('../../controllers/loginController')
const router = Router()

router.post('/login/:loginMethod', loginController)
module.exports = router