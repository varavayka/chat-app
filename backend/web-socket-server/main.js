const { WebSocketServer } = require("ws");
const { v4 } = require("uuid");
const ws = new WebSocketServer({
  port: 4002,
});

const socketCache = new Set();

ws.on("connection", (socket) => {
  socket.room = v4();
  socketCache.add(socket);
  socket.on("message", (buffer) => {
    const userData = JSON.parse(buffer.toString());
    socketCache.forEach((client) => {
      client.send(JSON.stringify({ ...userData }));
    });
  });
  socket.on("close", () => {
    socketCache.delete(socket);
    console.log("сокет закрыт");
  });
});
