const {WebSocketServer} = require('ws')
const {v4:socketId} = require('uuid')
const webSocketInstance = new WebSocketServer({port: 8080})
const socketStorage = new Set()
const rooms = ['@kirill', '@anton', '@sanya', '@victor', '@masha']
const messageDate = (fromParams, toParams) => `${new Date(Date.now())}`.split(' ').slice(fromParams,toParams).join(' ')
webSocketInstance.on('connection', (socketInstance) => {
    socketInstance.socketId = socketId()
    const room = [...socketInstance.socketId].splice(0, 5).join('')
    const broadcastRoom = 'room_broadcast'
    socketInstance.room = room
    if(!socketInstance.room) {
        return socketInstance.terminate()
    }
    socketStorage.add(socketInstance)
    console.log(`кол-во подключений - ${socketStorage.size}, socketId - ${socketInstance.socketId}, комната сокета -> ${socketInstance.room}`)

    // socketInstance.send(JSON.stringify({type: 'user_info', room:socketInstance.room, socketId: socketInstance.socketId}))
    socketStorage.forEach(client => client.send(JSON.stringify({type: 'user_info', room:socketInstance.room, socketId: socketInstance.socketId})))

    socketInstance.on('message', (bufferData) => {
        const response = JSON.parse(bufferData)
        const {type} =   response
        socketStorage.forEach(client => {
            if(type == 'user_message') {
                client.send(JSON.stringify({...response,type:'user_message', socketId:socketInstance.socketId, result: socketInstance.socketId === client.socketId, date: messageDate(0,5)}))
            }
        })
    })
    socketInstance.on('close', () => {
        socketStorage.delete(socketInstance)
        console.log(`Соединеие закрыто, ID сокета - ${socketInstance.socketId}`)
    })

})

