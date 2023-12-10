const {WebSocketServer} = require('ws')
const initWebSocketServer = new WebSocketServer({port:9091})

const socketStorage = new Set()
async function messengerController(req,res) {
    const authorizationHeader = req.headers.authorization.split(' ')[1]
    const {resultVeification, valid, tokenFind} = await validateToken(authorizationHeader)
        if(!valid) {
            return res.status(403).send('Not valid token')
        }
    if(!tokenFind) return res.status(401).send('Unauthorized')

    
}

module.exports = messengerController



