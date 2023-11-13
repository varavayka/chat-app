const {WebSocketServer} = require('ws')
const {v4:uuid} = require('uuid')
const {EventEmitter} = require('events')
const ws = new WebSocketServer({port:8081})
const e = new EventEmitter()
function wsSerever() {
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
wsSerever()
// module.exports = wsSerever