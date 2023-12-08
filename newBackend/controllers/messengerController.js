const {WebSocketServer} = require('ws')
const {apiRequestManagement, validateToken} = require('../db/dbController')
const initWebSocketServer = new WebSocketServer({port:9091})

const socketStorage = new Set()
async function messengerController(req,res) {
    const authorizationHeader = req.headers.authorization.split(' ')[1]
    const {resultVeification, valid, tokenFind} = await validateToken(authorizationHeader)
        if(!valid) {
            return res.status(403).send('Not valid token')
        }
    
        initWebSocketServer.on('connection', (socketInstace) => {
            const {shortname, userId} = resultVeification
            socketInstace.userIndentificator = {shortname, userId}
            socketStorage.add(socketInstace)

            socketInstace.on('message', (buffer) => {
                const date = `${new Date(Date.now())}`.split(' ').slice(0,5).join(' ')
                const messageInstance  = {...JSON.parse(buffer), date, userId, chatId:shortname}
                socketStorage.forEach(socket => {
                    socket.send(JSON.stringify(messageInstance))
                })

            })
            
        })
    
    if(!tokenFind) return res.status(401).send('Unauthorized')

    
}

module.exports = messengerController



