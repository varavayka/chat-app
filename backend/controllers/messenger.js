const {WebSocketServer} = require('ws')
const ws = new WebSocketServer({port:9091})
const messengerHandler = (req, res) => {
    ws.on('connection', socketExample => {
        socketExample.on('message', buffer => console.log(buffer.toString()))
})
    // return res.status(200).json({authorization:true, message:'success'})
};

module.exports = messengerHandler;
