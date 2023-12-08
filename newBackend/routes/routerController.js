const {Router} = require('express')
const loginRoute = require('./routes/loginRoute')
const rootRoute = require('./routes/rootRoute')
const messengerRoute = require('./routes/messengerRoute')
const router = Router()

router.use('/', rootRoute )
router.use('/login', loginRoute)
router.use('/messenger', messengerRoute)
module.exports = router
