const {WebSocket} = require('ws')

const client = new WebSocket('ws://127.0.0.1:4002/')


client.on('open', () => {
    client.send('ok')
})