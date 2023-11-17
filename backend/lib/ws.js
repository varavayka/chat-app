const {WebSocketServer} = require('ws')
const {v4:uuid} = require('uuid')
const {EventEmitter} = require('events')
const ws = new WebSocketServer({port:8081})
const requestDb = require('../db/main')()
const { verifyJwt } = require("./generateJwt");

const e = new EventEmitter()
async function wsSerever() {
  const tempStorageSession = new Set()
  const {checkToken, findDoc} = await requestDb
  ws.on('connection', socket => {
      
      socket.id = uuid()
      tempStorageSession.add(socket)
      console.log(`${tempStorageSession.size} - количество сокетов     идентификарторы сокетов - ${socket.id}`)

      socket.on('message', buffer => {
          const date = `${new Date(Date.now())}`.split(' ').slice(0,5).join(' ')
        //   const messageTEmp = {...JSON.parse(buffer), date, userId: socket.id}
          const {type,token, message, userId} = {...JSON.parse(buffer), date, userId: socket.id}

          tempStorageSession.forEach(async socket => {
            // const {userId, message,type} = messageTEmp
            const msg = checkID(socket.id, userId, message,type)
            if(type=== 'message') {
                socket.send(JSON.stringify({...msg, date,type:'message'}))
                console.log(msg)
            }
            if(type === 'authorization') {
                return  socket.send(JSON.stringify({type:'authorization', status: await authorization(token, {checkToken, findDoc}, verifyJwt,socket)}))
               
            }

        })
        
      })
      socket.on("close", () => {
        tempStorageSession.delete(socket);
        console.log("сокет закрыт");
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
    }
}