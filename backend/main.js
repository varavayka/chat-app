const {WebSocketServer} = require('ws')
const {v4:uuid} = require('uuid')
const {EventEmitter} = require('events')
const modificateReport = require('./modificateReport')
const messageDate = require('./messageDate')


const webSocketInstance = new WebSocketServer({port: 8080})


const e = new EventEmitter()
const socketStorage = new Set()
const privateSockets = new Set()
webSocketInstance.on('connection', (socketInstance) => {

    const socketId = uuid()
    const chatId = socketId.split('-')
    socketInstance.socketId = socketId
    socketInstance.chatId = chatId[chatId.length - 1]
    socketStorage.add(socketInstance)

    modificateReport(`Кол-во пользователей онлайн: ${socketStorage.size}\nИдентификаторы пользователей: ${socketInstance.socketId}\nИдентификатор чата: ${socketInstance.chatId}`)

    socketStorage.forEach(infoMessage => infoMessage.send(JSON.stringify({messageType: 'init_message', userId: infoMessage.socketId, chatId: infoMessage.chatId})))

    socketInstance.on('message', (messageReceived) => {
        const {socketId, chatId} = socketInstance
        const messageInstance = {
            ...JSON.parse(messageReceived),
            socketId, chatId,
            date: messageDate(0,5),
            from: chatId
        }
        messageFilter(messageInstance,socketStorage, socketInstance )

    })
    socketInstance.on('close', () => socketStorage.delete(socketInstance))
})

function messageFilter(message, socketList) {
    const {messageType, to, from, message: clientMessage} = message
    switch(messageType) {

        case 'broadcast_message':
            messageSendingHandler(socketList, message)
            break
        
        case 'chat_message':
            privateRoom(socketStorage, message)
            break
        
        case 'search_message':
            const {searchPattern}  = message
            const {chatId} = [...socketList].find(({chatId}) => chatId === searchPattern)
            messageSendingHandler(socketList, {...message, searchPattern:chatId})
            break

    }
}


function privateRoom(socketStorage, message) {
    const {from, to} = message
    const rooms = subArr([...socketStorage])
    
    rooms.forEach(room => {
        roomSenders(room, message)
    })

    
}

function roomSenders(room, message) {
    const {socketId, from, to}  = message
   room.forEach((client, index) => {
    const messageInstance = {
        ...message,
        compareId:client.socketId === socketId
    }
    if(from === client.chatId || to === client.chatId) {
        client.send(JSON.stringify(messageInstance))

    }
   })
}
function  subArr(arr, countElem=2) {
    let count = 0
    let resultArr = []
    while(count < Math.ceil(arr.length / countElem)) {

        resultArr[count] = arr.slice((count * countElem), (count * countElem) + countElem)
        count++
    }

    return resultArr
}


// function privateRoom(socketStorage, privateSockets, message) {
//     const {from, to} = message
//     socketStorage.forEach(socket => {
//         if(socket.chatId === from ) {
//             privateSockets.add(socket)
//         }
//         if(socket.chatId === to) {
//             privateSockets.add(socket)
//         }
//     })
    
//     privateSockets.forEach(socket => {
//         const privateMessage = {
//             messageType: 'chat_message',
//             ...message,
//             compareId:socket.socketId === message.socketId
//         }
        
        
//             socket.send(JSON.stringify(privateMessage))
        
//     })
// }
function messageSendingHandler(listOfClients, messageToSend) {
    const {socketId} = messageToSend
    listOfClients.forEach(client => {

        const messageInstance = {
            ...messageToSend,
            compareId:client.socketId === socketId
        }
        client.send(JSON.stringify(messageInstance))

    })
}
 