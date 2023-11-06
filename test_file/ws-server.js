const {WebSocketServer}  =require('ws')
const {v4:uuid} = require('uuid')

const ws = new WebSocketServer({port: 8081})

const cacheSession = new Set()


ws.on('connection', socket => {
    socket.userId = uuid()
    cacheSession.add(socket)
    socket.on('message', buffer => {
        const date = `${new Date(Date.now())}`.split(' ').slice(0,5).join(' ')
        
        const message = {...JSON.parse(buffer), date, userId: socket.userId}
        
        cacheSession.forEach(client => client.send(JSON.stringify(message)))
    })
})