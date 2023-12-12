const {WebSocketServer} = require('ws')

const clientsStorage = new Set()
function messagingService(token) {
    const webSocketInstance = new WebSocketServer({port: 8081})
    
    webSocketInstance.on('connection', socketInstance => {
        const {userId, shortname, username} = JSON.parse(atob(token.split('.')[1]))
        socketInstance.userId = userId
        socketInstance.chat = shortname
        clientsStorage.add(socketInstance)

        
        socketInstance.on('message', message => {
            const response = {message:message.toString(), userData: {userId,shortname,username}, token}
            clientsStorage.forEach(client => {
                client.send(JSON.stringify(response))
            })
        })
    })
}

module.exports = messagingService