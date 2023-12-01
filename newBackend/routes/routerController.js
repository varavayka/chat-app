const {Router} = require('express')
const loginRoute = require('./routes/loginRoute')
const rootRoute = require('./routes/loginRoute')

const router = Router()

router.use('/', rootRoute )
router.use('/login', loginRoute)


module.exports = router
