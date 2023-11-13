// const express = require('express')
// const cors = require('cors')
const { WebSocketServer } = require('ws')
// const {join} = require('path')
// const app = express()
// app.use(cors())
const {v4:uuid} = require('uuid') 

const ws = new WebSocketServer({port: 7777})

// app.use(express.static(join(__dirname, './build')))
// app.listen(8080)

function test() {
    const tempStorageSession = new Set()

    ws.on('connection', socket => {
        socket.id = uuid()
        tempStorageSession.add(socket)
        console.log(`${tempStorageSession.size} - количество сокетов     идентификарторы сокетов - ${socket.id}`)
        socket.on('message', buffer => {
            const date = `${new Date(Date.now())}`.split(' ').slice(0,5).join(' ')
            const message = {...JSON.parse(buffer), date, userId: socket.id}
            console.log(message)
            tempStorageSession.forEach(socket => socket.send(JSON.stringify(message)))
        })
        socket.on("close", () => {
            tempStorageSession.delete(socket);
            console.log("сокет закрыт");
        });
    }) 
}
test()
