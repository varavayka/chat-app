const {Router}  = require('express')
const messengerController = require('../../controllers/messengerController')
const middleWareAuthorization = require('../../middleware/middleWareAuthorization')
const router = Router()

router.get('/messenger',middleWareAuthorization, messengerController)
module.exports = router