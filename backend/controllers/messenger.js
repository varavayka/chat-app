const {WebSocketServer} = require('ws')
const ws = new WebSocketServer({port:9091})
const messengerHandler = (req, res) => {
    const socketCache = new Set();

ws.on("connection", (socket) => {
//   socket.room = v4();
  socketCache.add(socket);
  socket.on("message", (buffer) => {
    const userData = JSON.parse(buffer.toString()) ;
    // console.log(userData)
    // socketCache.forEach((client) => {
      socket.send(JSON.stringify({...userData}));
    // });
  });
  socket.on("close", () => {
    socketCache.delete(socket);
    console.log("сокет закрыт");
  });
});

    return res.status(200).json({authorization:true, message:'success'})
};

module.exports = messengerHandler;
