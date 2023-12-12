
const messagingService = require('../services/messagingService')

async function messengerController(req,res) {
    const {authorization} = req.headers
    const tokenFromRequest = authorization.split(' ')[1]
    messagingService(tokenFromRequest)
    res.status(200).send('Подключение к вебсокету выполнено')
}

module.exports = messengerController



