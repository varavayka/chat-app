const {WebSocketServer} = require('ws')
const {v4:uuid} = require('uuid')
const {EventEmitter} = require('events')
const modificateReport = require('./modificateReport')
const messageDate = require('./messageDate')


const messageInstance = {
    message: 'string',
    date: 'string',
    
    identifiers: {
        userId: 'string',
        chatId: 'string',
        
    },
    informationTransmitted: {
       fromUser: 'string',
       toUser: 'string'

    }

}




const webSocketInstance = new WebSocketServer({port: 8080})


const e = new EventEmitter()
const socketStorage = new Set()
const privateStorage = new Set()

webSocketInstance.on('connection', (socketInstance) => {
    socketInstance.socketId = uuid()
    socketInstance.chatId = socketInstance.socketId.split('-')[0]
    socketStorage.add(socketInstance)

    modificateReport(`Кол-во пользователей онлайн: ${socketStorage.size}\nИдентификаторы пользователей: ${socketInstance.socketId}\nИдентификатор чата: ${socketInstance.chatId}`)

   
    // e.on(socketInstance.socketId, (message=null, socket) => {
    //     const {chatId} = message
    //     console.log(chatId)
    //     // socket.send(JSON.stringify(message))
    // })

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
})

const listPrivateMessage = []
function messageFilter(message, socketList, socketInstance) {
    const {messageType, privateChat, socketId, to, from, message:receiveMessage} = message
    
    switch(messageType) {

        case 'broadcast_message':
            messageSendingHandler(socketList, message)
            break
        
        case 'chat_message':
            const {from, to, socketId:socketId0} = message

            socketStorage.forEach(({chatId,socketId:socketId1,  ...socket}) => {
                // if(chatId === to) {
                    // }
                    listPrivateMessage.push({route: `${from} ${from === chatId ? '->' : '<-'} ${to}`, receiveMessage})
                    modificateReport(JSON.stringify(listPrivateMessage), '*')
            } )
            // messageSendingHandler(socketList, {...message, fromRoom:from, toRoom: to}, socketInstance)
            break
        
        case 'search_message':
            const {searchPattern}  = message
            const {chatId} = [...socketList].find(({chatId}) => chatId === searchPattern)
            messageSendingHandler(socketList, {...message, searchPattern:chatId})
            break

    }
}

/*
    как идея, можно получать номера сокертов  из ключей from и to в сообщении, отправлять их в другое хранилище, конрктно два сокета с этими номерами и уже устраивать между этими сокетами двусторонее соединение
    так же идея номер 2 - использовать EventEmitter в котороый будет передавать как событие номер сокета, и при приёме сообщения, будет происходить срабатывание обработчика 
    


*/
function messageSendingHandler(listOfClients, messageToSend, socketInstance) {
    const {socketId} = messageToSend
    listOfClients.forEach(client => {

        const messageInstance = {
            ...messageToSend,
            compareId:client.socketId === socketId
        }
        client.send(JSON.stringify(messageInstance))

    })
}
 





// const {WebSocketServer} = require('ws')
// const {v4:uuid} = require('uuid')
// const {EventEmitter} = require('events')
// const modificateReport = require('./modificateReport')
// const messageDate = require('./messageDate')


// const webSocketInstance = new WebSocketServer({port: 8080})


// const e = new EventEmitter()
// const socketStorage = new Set()



// webSocketInstance.on('connection', (socketInstance) => {
//     socketInstance.socketId = uuid()
//     socketInstance.chatId = socketInstance.socketId.split('-')[0]

//     socketStorage.add(socketInstance)
//     console.log(socketInstance.chatId)

   

//     socketInstance.on('message', (messageReceived) => {
//         const {socketId, chatId} = socketInstance
//         const messageInstance = {
//             ...JSON.parse(messageReceived),
//             socketId, chatId,
//             date: messageDate(0,5),
//             from: chatId
//         }
//         messageFilter(messageInstance,socketStorage, socketInstance )

//     })
// })


// function messageFilter(message, socketList, socketInstance) {
//     const {messageType, privateChat, socketId, to} = message
    
//     switch(messageType) {

//         case 'broadcast_message':
            
//             messageSendingHandler(socketList, message)
//             break
        
//         case 'chat_message':
//             socketList.forEach(client => {
//                 if(socketInstance.chatId === to) {
//                     client.send(JSON.stringify(message))
//                 }
                    
//             })
//             break
        
//         case 'search_message':
//             const {searchPattern}  = message
//             const {chatId} = [...socketList].find(({chatId}) => chatId === searchPattern)
//             messageSendingHandler(socketList, {...message, searchPattern:chatId})
//             break

//     }
// }


// function messageSendingHandler(listOfClients, messageToSend) {
//     const {socketId} = messageToSend
    
//     listOfClients.forEach(client => {

//         const messageInstance = {
//             ...messageToSend,
//             compareId:client.socketId === socketId
//         }
//         client.send(JSON.stringify(messageInstance))

//     })
// }
 
