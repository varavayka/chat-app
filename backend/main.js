const {WebSocketServer} = require('ws')
const {v4:uuid} = require('uuid')
const {EventEmitter} = require('events')
const modificateReport = require('./modificateReport')
const messageDate = require('./messageDate')
const subArr = require('./subArr')

const webSocketInstance = new WebSocketServer({port: 8080})


const e = new EventEmitter()
const socketStorage = new Set()
const rooms = new Map()
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
    const {messageType, to, from, message: clientMessage, socketId, chatId} = message
    switch(messageType) {

        case 'broadcast_message':
            messageSendingHandler(socketList, message)
            break
        
        case 'chat_message':

            const sockets = [...socketStorage]
            const listRooms = subArr(sockets)
            

            listRooms.forEach(room => {
                rooms.set(to, room)
            })

            
            rooms.get(to)
            .forEach(room => {
                console.log(to === room.chatId) // если слать сообщение от получателя к отправителю то свойство отправителя будет пустым, нужно поля менять местами, from станет to, а to станет from
                room.send(JSON.stringify({...message,  compareId:room.socketId === socketId}))
                console.log(room.chatId === to ? from : to)
            })
            // console.log(rooms)
            // const connections = subArr(sockets, to)
            // privateSockets.set(to, ...connections)

            // if(privateSockets.has(to)) {
            //     privateSockets.get(to)
            //     .forEach(client => {
            //         // console.log(to + ' ' + 'получатель'|| from + ' ' + 'отправитель')
            //         if(to || from === client.chatId)
            //         client.send(JSON.stringify({...message, compareId:client.socketId === socketId}))
            //     })
            // }
            
            // .forEach(client => client.send(JSON.stringify({...message, compareId:client.socketId === socketId})))

            // console.log(connections.get(to), to)
            // connections.get(to).forEach(client => client.send(JSON.stringify({...message, compareId:client.socketId === socketId})))
            // const connections = subArr(sockets, socketId)
            // console.log(connections)

            // const [ws01,ws02] = connections
            
            // connections.forEach(session => {
            //     console.log(session)
            // })
            // console.log(message)
            // ws01.forEach(client => {
            //     console.log(client.chatId === to )
            // })

            // ws02.forEach(client => client.send(JSON.stringify({...message, compareId:client.socketId === socketId})))
            // connections.forEach(session => {
            //     const {clients} = session
            //     console.log(session.clients[0])
            //     // session.clients.forEach(client => {
            //     //     // console.log(`идентификатор из сообщения: ${socketId}\nИдентификатор сессии: ${session.sessionId}\n${client.socketId === socketId ? 'вы': 'не вы'}`)
            //     //     if(socketId === client.socketId) {
            //     //         client.send(JSON.stringify({...message, compareId:client.socketId === socketId}))
            //     //     }
            //     // })
            // })
            // const [ws1,ws2,ws3,ws4] = subArr(sockets)
            // const [ws1] = subArr(sockets)

            // ws1.forEach(clients => {
            //     clients.send(JSON.stringify(message))
            //     // clients.send(JSON.stringify({...message, compareId:clients.socketId === socketId}))
            // })
            // console.log('Первая комната ', ws1)
            // console.log(ws1,ws2,ws3)
            // console.log('Вторая комната ', ws2)
            // console.log('Третья комната ', ws3)
            // console.log('Четвертая комната ', ws4)

            // rooms.forEach((session) => {
            //     const [socketOne, socketTwo, {sessionId}] = session
            //     socketOne.session = sessionId
            //     socketTwo.session = sessionId
                
                
            //     const privateSocket = [socketOne,socketTwo]

            //     privateSocket.forEach(client => {
            //         if(client.session === sessionId) {

            //             client.send(JSON.stringify({...message, compareId:client.socketId === socketId}))
            //         }
            //     })
                
            // })
            // rooms.forEach(room => {
                
            //     // room.forEach((client, index) => {
            //     //     const messageInstance = {
            //     //         ...message,
            //     //         compareId:client.socketId === socketId
            //     //     }
            //     //     if(from === client.chatId) {
            //     //         client.send(JSON.stringify(messageInstance))
            //     //     }
            //     //     if(to === client.chatId) {
            //     //         client.send(JSON.stringify(messageInstance))

            //     //     }
            //     //    })

            // })
            break
        
        case 'search_message':
            searchRequestHandler(message,socketList, messageSendingHandler)
            // const {searchPattern}  = message
            // const {chatId} = [...socketList].find(({chatId}) => chatId === searchPattern)
            // messageSendingHandler(socketList, {...message, searchPattern:chatId})
            break

    }
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
 


function searchRequestHandler(message,socketList, messageSendingHandler) {
    const {searchPattern}  = message
    const {chatId} = [...socketList].find(({chatId}) => chatId === searchPattern)
    messageSendingHandler(socketList, {...message, searchPattern:chatId})
}