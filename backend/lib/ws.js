const {WebSocketServer} = require('ws')
const {v4:uuid} = require('uuid')
const {EventEmitter} = require('events')
const ws = new WebSocketServer({port:8081})
const requestDb = require('../db/main')()
const { verifyJwt } = require("./generateJwt");
const modificateReport = require('./test')
const e = new EventEmitter()
const globalEventEmitter = require('../lib/eventEmitter')
const messageDate = (fromParams, toParams) => `${new Date(Date.now())}`.split(' ').slice(fromParams,toParams).join(' ')

async function wsSerever() {
  const socketStorage = new Set()
  const authentificatedUser = new Set()
  const {checkToken, findDoc} = await requestDb
  ws.on('connection', socket => {
    globalEventEmitter.once('getId', async (id) => {
      const {shortname} = await checkToken(await findDoc({jwt:id}))
      authentificatedUser.add(shortname)
    })
    authentificatedUser.forEach(id => {
      socket.room = id
    })
    socket.id = uuid()
    socketStorage.add(socket)
    modificateReport(`Количество сокетов -> ${socketStorage.size}\nИдентификартор сокетов -> ${socket.id}\nИдентификатор комнаты -> ${socket.room}`)

    socket.on('message', async buffer => {
      
      const date = messageDate(0, 5)
      const {id,room} = socket
      const message = {...JSON.parse(buffer), date, id, room}
      
      const status = await authorization(message.token, {checkToken, findDoc}, verifyJwt,socket)

      const broadcast = publicSendingOfMessages(socketStorage)
      switch(message.type) {
        case 'message':
          broadcast(message.type,{...message, status})
          e.emit(message.type)
          break
        case 'authentication':
          broadcast(message.type,{type:message.type, status})
          e.emit(message.type)
          break

      }
      
    })


    socket.on("close", () => {
      socketStorage.delete(socket);
      modificateReport("сокет закрыт")
    });


  }) 
}
// wsSerever()
module.exports = wsSerever   

function publicSendingOfMessages(wsSessionList) {
  return (event, broadcastMessage) => 
  wsSessionList.forEach((session) => {
    e.once(event, () => session.send(JSON.stringify(broadcastMessage)))
  })

}

async function authorization(token, db, verifyJwt) {
    const {findDoc, checkToken} = await db
    const { tokenFound, secretJwt } = await checkToken(await findDoc({jwt:token}))
    

    if (tokenFound) {
      const {authorized} = await verifyJwt(token, secretJwt);
      if (authorized) {
        return {authorized:true}
      }
      if (!authorized) {
        return  {authorized:false}
      }
      return 
    }
    if(!tokenFound) {
      return  {authorized:false}
    }

}



