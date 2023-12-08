const {Router} = require('express')
const messengerController = require('../../controllers/messengerController')
const router = Router()

router.get('/',messengerController)
module.exports = router