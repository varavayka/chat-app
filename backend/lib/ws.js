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
          const messageTEmp = {...JSON.parse(buffer), date, userId: socket.id}
          
          tempStorageSession.forEach(socket => {
              const {userId, message} = messageTEmp
              const msg = checkID(socket.id, userId, message)
              socket.send(JSON.stringify({...msg, date}))
              console.log(msg)
        })
      })
      socket.on("close", () => {
        
          tempStorageSession.delete(socket);
          console.log("сокет закрыт");
      });
  }) 
}
wsSerever()
// module.exports = wsSerever   


function checkID(socketId, messageId, message) {
    return {socketId,messageId, result: socketId === messageId, message}

}