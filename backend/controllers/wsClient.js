
const {WebSocket} = require('ws')

const ws = new WebSocket('ws://localhost:9091')

ws.on('open', socket => ws.send('клиент отработал'))