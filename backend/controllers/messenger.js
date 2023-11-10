// const {WebSocketServer} = require('ws')
// const {v4:uuid} = require('uuid')

// const ws = new WebSocketServer({port:8081})
// const socketCache = new Set();
// const wsSerever = require('../lib/ws')
const messengerHandler = (req, res) => {
  // console.log('веб сокет сервер работает ')
  // ws.on("connection", (socket) => {
  //   socket.room = uuid()
  //   socketCache.add(socket);
  //   socket.on("message", (buffer) => {
  //     const date = `${new Date(Date.now())}`.split(' ').slice(0,5).join(' ')
  //     const message = {...JSON.parse(buffer), date, userId: socket.room}
  //     console.log(message)
  //     socketCache.forEach((client) => {
  //       client.send(JSON.stringify(message));
  //     });
  //   });
  //   socket.on("close", () => {
  //     socketCache.delete(socket);
  //     console.log("сокет закрыт");
  //   });
  // });
  return res.status(200).json({authorization:true, message:'success'})
}

module.exports = messengerHandler;
