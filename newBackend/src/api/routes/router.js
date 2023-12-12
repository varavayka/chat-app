const {Router} = require('express')
const loginRoute = require('./routes/loginRoute')
const messengerRoute = require('./routes/messengerRoute')

const router = Router()

router.use('/api', loginRoute)
router.use('/api', messengerRoute)




module.exports = router