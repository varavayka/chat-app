const {WebSocketServer} = require('ws')
const {v4:uuid} = require('uuid')

const ws = new WebSocketServer({port:8081})
const socketCache = new Set();
function wsSerever() {
  ws.on("connection", (socket) => {
    // console.log('веб сокет сервер работает ')
    
    socket.id = uuid()
    socketCache.add(socket);
    console.log(`${socketCache.size} - количество сокетов     идентификарторы сокетов - ${socket.id}`)
      socket.on("message", (buffer) => {
        const date = `${new Date(Date.now())}`.split(' ').slice(0,5).join(' ')
        const message = {...JSON.parse(buffer), date, userId: socket.id}
        console.log(message)
        socketCache.forEach((client) => {
          client.send(JSON.stringify(message));
        });
      });
      socket.on("close", () => {
        socketCache.delete(socket);
        console.log("сокет закрыт");
      });
    });
}
wsSerever()
// module.exports = wsSerever