const {WebSocketServer} = require('ws')
const {v4:uuid} = require('uuid')
const {EventEmitter} = require('events')
const ws = new WebSocketServer({port:8081})
const requestDb = require('../db/main')()
const { verifyJwt } = require("./generateJwt");
const modificateReport = require('./test')
const e = new EventEmitter()





async function wsSerever() {
  const socketStorage = new Set()
  const {checkToken, findDoc} = await requestDb
  ws.on('connection', socket => {
      
    socket.id = uuid()
    socketStorage.add(socket)
    modificateReport(`Количество сокетов -> ${socketStorage.size}\nИдентификарторы сокетов -> ${socket.id}`)
    socket.on('message', async buffer => {
      const date = messageDate(0, 5)

      const {type,token, message, userId, room} = {...JSON.parse(buffer), date, userId: socket.id}
      const initBroadcastMessegesHandler = broadcastMessages(socketStorage)
      const msg = !message ? null : checkID(socket.id, userId, message)
      const status = await authorization(token, {checkToken, findDoc}, verifyJwt,socket)

      if(msg) {
        console.log(JSON.parse(buffer))
        initBroadcastMessegesHandler('message', {...msg, date , status, type})
      }
        initBroadcastMessegesHandler('authorization', {type, date , status}, userId)
      e.emit(type)
    })


    socket.on("close", () => {
      socketStorage.delete(socket);
      modificateReport("сокет закрыт")
    });


  }) 
}
// wsSerever()
module.exports = wsSerever   


function checkID(socketId, messageId, message) {
    return {socketId,messageId, result: socketId === messageId, message}

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

const messageDate = (fromParams, toParams) => `${new Date(Date.now())}`.split(' ').slice(fromParams,toParams).join(' ')

function broadcastMessages(wsSessionList) {
  return (event, broadcastMessage) => 
  wsSessionList.forEach((session) => {
    e.once(event, () => session.send(JSON.stringify(broadcastMessage)))
  })

}