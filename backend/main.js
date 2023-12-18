const {WebSocketServer} = require('ws')
const {v4:uuid} = require('uuid')
const {EventEmitter} = require('events')
const modificateReport = require('./modificateReport')
const messageDate = require('./messageDate')


const webSocketInstance = new WebSocketServer({port: 8080})


const e = new EventEmitter()
const socketStorage = new Set()



webSocketInstance.on('connection', (socketInstance) => {
    socketInstance.socketId = uuid()
    socketInstance.room = [...socketInstance.socketId].slice(0,5).join('')
    socketStorage.add(socketInstance)
    socketInstance.on('message', (messageReceived) => {


        const {type} = JSON.parse(messageReceived)
        console.log(type)
        const preparationMessage = {
            ...JSON.parse(messageReceived),
            socketId: socketInstance.socketId,
            room: socketInstance.room,
        }
        if(type === 'broadcast') {
           return  broadcast(socketStorage, preparationMessage)
        }
        roomCommunication(type, socketStorage, preparationMessage)
        

    })
})



function broadcast(listOfClients, messageToSend) {
    const {socketId: idFromMessage} = messageToSend
    const preparationMessage = {
        ...messageToSend,
        date: messageDate(0,5)
    }
    
    listOfClients.forEach(client => {
        const comparisonId = client.socketId === idFromMessage
        client.send(JSON.stringify({...preparationMessage, comparisonId}))
    })
}

function roomCommunication(roomId, listOfClients, messageToSend) {
    
}
 
