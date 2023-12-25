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
})

function messageFilter(message, socketList, socketInstance) {
    const {messageType, to, from} = message
    switch(messageType) {

        case 'broadcast_message':
            messageSendingHandler(socketList, message)
            break
        
        case 'chat_message':
            socketStorage.forEach(socket => {
                if(socket.chatId === from ) {
                    privateSockets.add(socket)
                }
                if(socket.chatId === to) {
                    privateSockets.add(socket)
                }
            })
            
            privateSockets.forEach(socket => {
                const privateMessage = {
                    messageType: 'chat_message',
                    ...message
                }
                socket.send(JSON.stringify(privateMessage))
            })

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
 