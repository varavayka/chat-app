import { useEffect,  useState,useRef} from "react";
import {v4} from 'uuid'
import "./css/messenger.css";
import Menu from "./ Menu";
import SearchBar from "./SearchBar";
import Discussion from "./Discussion";
import HeaderChat from "./HeaderChat";
import Message from "./Message";
import SendMessageIcon from "./SvgSengMessageIcon";
import inputHandler from "../../handlers/inputHandler";
import buttonHandler from "../../handlers/buttonHandler";
const Messenger = () => {
    
    const [allowSend, setAllowSend] = useState(false)
    const [onlineStatus,setOnlineStats] = useState(false)

    const [inputValue,setInputValue] = useState({})

    const [broadCastMessage, setBroadCastMessage] = useState([])
    const [resultSearchUser, setResultSearchUser] = useState([])

    const [chatMessage, setChatMessage] = useState([])
    const [destenationChat, setDestenationChat] = useState('')
    

    const ws = useRef(null)

    useEffect(() => {
      ws.current = new WebSocket('ws://localhost:8080/')
      ws.current.onopen = (({target:{readyState}}) => setOnlineStats(true))
      return () =>  ws.current.close()
    },[])
    
    useEffect(() => {
      ws.current.onmessage = ({data}) => {
        const message = JSON.parse(data)
        const {messageType} = message

        switch(messageType) {

          case 'init_message':
            sessionStorage.setItem('userIdentificators', JSON.stringify({yourChatId: message.chatId, yourUserId: message.userId}))
            // setListUser([...listUsers, message])
            // console.log(message)
            break

          case 'broadcast_message':
            setBroadCastMessage([...broadCastMessage, message])
            break
          
          case 'chat_message': 
            setChatMessage([...chatMessage, message])
            break
          
          case 'search_message':
            console.log(message)
            setDestenationChat(message.searchPattern)
            // setResultSearchUser([...resultSearchUser, message])
            break
          
          default:
            // console.log(message)
            break

        }
        
      }
    }, [broadCastMessage, resultSearchUser, chatMessage])
     
    function sendMessage(inputValue) {
      
      if(Object.values(inputValue).length) {
        const messageInstance = {
          ...inputValue,
          messageType: 'chat_message',
          from: JSON.parse(sessionStorage.getItem('userIdentificators')).yourChatId,
          to: destenationChat || response() 

        }
        // console.log(messageInstance)
        
        ws.current.send(JSON.stringify(messageInstance))
        setInputValue({})
      }

      
      
    }
    function response() {
      let to = ''
      chatMessage.forEach(({chatId}) => {
        if(chatId !== JSON.parse(sessionStorage.getItem('userIdentificators')).yourChatId)
        to = chatId
      })
      return to
    }

    const searchHandlerUser = (chatId) =>  {
      ws.current.send(JSON.stringify({searchPattern: chatId, messageType: 'search_message'}))
    }

    
    return (
      <div className="body" onKeyDown={({key}) => key === 'Enter' ? sendMessage(inputValue): null}>
        <div className="container">
          <div className="row_01">
          
            <SearchBar searchHandler={searchHandlerUser}/>
           
            <section className="chat">
                   { destenationChat ? <HeaderChat  onlineStatus={onlineStatus} username={response() || destenationChat  }/>: ''}

                    <div className="messages-chat" key={v4()}>
               
                      {!chatMessage.length ? '' : chatMessage.map(({message, date, socketId, compareId, chatId}) => {
                        return (

                          <div key={v4()} className={compareId ? 'right' : 'left' }>
                            <Message text={message} compareId={compareId}  >
                            <p className="userId">{compareId ? 'вы' : 'Собеседник'}</p>
                            <p className="time"> {date}</p>
                            </Message>
                          </div>
                          )
                        
                        
                      })}
                    </div>
                  
              <div className="footer-chat">

                <input 
                type="text"
                className="write-message"
                placeholder= "Type your message here"
                onChange={inputHandler(setInputValue,inputValue, 'message')}
                value={inputValue.message || ''}/>

                <i className="icon send clickable" 
                
                onClick={buttonHandler(setAllowSend,allowSend,false, true, () => {
                  sendMessage(inputValue)
                  // setInputValue({})
                } )}><SendMessageIcon /></i>

              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }


export default Messenger;







//вторая реализация комнат


// import { useEffect,  useState,useRef, useCallback } from "react";
// import {v4} from 'uuid'
// import "./css/messenger.css";
// import Menu from "./ Menu";
// import SearchBar from "./SearchBar";
// import Discussion from "./Discussion";
// import HeaderChat from "./HeaderChat";
// import Message from "./Message";
// import SendMessageIcon from "./SvgSengMessageIcon";
// import inputHandler from "../../handlers/inputHandler";
// import buttonHandler from "../../handlers/buttonHandler";
// const Messenger = () => {
    
//     const [allowSend, setAllowSend] = useState(false)
//     const [onlineStatus,setOnlineStats] = useState(false)

//     const [inputValue,setInputValue] = useState({})

//     const [broadCastMessage, setBroadCastMessage] = useState([])
//     const [resultSearchUser, setResultSearchUser] = useState([])
//     const [chatMessage, setChatMessage] = useState([])
 
//     const [enterChat, setEnterChat] = useState(null)




//     const ws = useRef(null)
//     useEffect(() => {
//       ws.current = new WebSocket('ws://localhost:8080/')
//       ws.current.onopen = (({target:{readyState}}) => setOnlineStats(true))
//       return () =>  ws.current.close()
//     },[])
    






//     useEffect(() => {
//       ws.current.onmessage = ({data}) => {
//         const message = JSON.parse(data)
//         const {messageType} = message

//         switch(messageType) {

//           case 'broadcast_message':
//             setBroadCastMessage([...broadCastMessage, message])
//             break
          
//           case 'chat_message':
//             console.log(message)
//             setChatMessage([...chatMessage, message])
//             break
          
//           case 'search_message':
//             setResultSearchUser([...resultSearchUser, message])
//             break
          
//           default:
//             console.log(message)
//             break

//         }
        
//       }
//     }, [broadCastMessage, resultSearchUser, chatMessage])
     
//     function sendMessage(inputValue) {
      
//       if(Object.values(inputValue).length) {
        
//         const messageInstance = {
//           ...inputValue,
//           messageType: !enterChat ? 'broadcast_message': 'chat_message',
          
//           to: enterChat,

//         }
//         ws.current.send(JSON.stringify(messageInstance))
//       }

//     }

//     const searchHandlerUser = (chatId) =>  {
//       ws.current.send(JSON.stringify({searchPattern: chatId, messageType: 'search_message'}))
//     }

    
//     return (
//       <div className="body">
//         <div className="container">
//           <div className="row">
//             <Menu />
//             <section className="discussions">
//               <SearchBar searchHandler={searchHandlerUser}/>
           
//                 {resultSearchUser.map(({searchPattern,compareId}) => {
//                   if(searchPattern && compareId) {
                    
//                     return (
//                       <div key={v4()}>
//                         <Discussion chatId={searchPattern} setEnterChat={setEnterChat}/> 
//                       </div>
//                     )

//                   }
//                   return null
//                 })}
               
                 
             
//             </section>

//             <section className="chat">
//               <HeaderChat  onlineStatus={onlineStatus} username={enterChat}/>
//               {/* <HeaderChat  onlineStatus={onlineStatus} username={room || privateRoom}/> */}
//               <div className="messages-chat">
               
//                 {!chatMessage.length ? '' : chatMessage.map(({message, date, socketId, compareId}) => {
//                   return (
//                   <div key={v4()} className={compareId ? 'right' : 'left' }>
//                     <Message text={message} compareId={compareId}  >
//                     <p className="userId">{socketId}</p>
//                     <p className="time"> {date}</p>
//                     </Message>
//                     </div>)
//                 })}
//               </div>
//               <div className="footer-chat">

//                 <input 
//                 type="text"
//                 className="write-message"
//                 placeholder= "Type your message here"
//                 onChange={inputHandler(setInputValue,inputValue, 'message')}
//                 value={inputValue.message || ''}/>

//                 <i className="icon send clickable" onClick={buttonHandler(setAllowSend,allowSend,false, true, () => {
//                   sendMessage(inputValue)
//                   setInputValue({})
//                 } )}><SendMessageIcon /></i>

//               </div>
//             </section>
//           </div>
//         </div>
//       </div>
//     );
//   }


// export default Messenger;






































// первая реализация комнат


// import { useEffect,  useState,useRef, useCallback } from "react";
// import {v4} from 'uuid'
// import "./css/messenger.css";
// import Menu from "./ Menu";
// import SearchBar from "./SearchBar";
// import Discussion from "./Discussion";
// import HeaderChat from "./HeaderChat";
// import Message from "./Message";
// import SendMessageIcon from "./SvgSengMessageIcon";
// import inputHandler from "../../handlers/inputHandler";
// import buttonHandler from "../../handlers/buttonHandler";
// import DefaultDiscussion from "./defaultDiscussion";
// const Messenger = () => {
    
//     const [allowSend, setAllowSend] = useState(false)
//     const [onlineStatus,setOnlineStats] = useState(false)
//     const [inputValue,setInputValue] = useState({})
//     const [messages, setMessages] = useState([])
//     const [room, setRoom] = useState('')
//     const [privateRoom, setprivateRoom] = useState('')

//     const [entranceRoom, setEntranceRoom] = useState({})
//     const [searchResult, setSearchResult] = useState([])
//     const [privateChat, setPrivateChat] = useState([])
//     const [privateType, setPrivateType] = useState(false)
//     const ws = useRef(null)


    
    
//     useEffect(() => {
//       ws.current = new WebSocket('ws://localhost:8080/')
//       ws.current.onopen = (({target:{readyState}}) => setOnlineStats(true))
//       return () =>  ws.current.close()
//     },[])
    
//     useEffect(() => {
//       ws.current.onmessage = ({data}) => {
//         const message = JSON.parse(data)
//         const {room, message: msg, date, comparisonId, messageType} = message
//         setEntranceRoom({...entranceRoom, room, msg,date, comparisonId})
//         setPrivateChat([...privateChat,room, msg,date, comparisonId ])
//         console.log(message)
//         switch(messageType) {
//           case 'message':
//             console.log(message)
//             return setMessages([...messages, message])
//           case 'search_message':
//             const {userFinded, searchRoom} = message
//             if(userFinded) {
//               setSearchResult([...searchResult,{userFinded, searchRoom}])
//               break
//             }
//             console.log('Пользователь не найден')
//             break
            



//           default:
//             break
//         }

        
//       }
//     }, [messages, entranceRoom, searchResult, privateChat])
     
//     function sendMessage(inputValue) {
//       if(Object.values(inputValue).length) {
//         ws.current.send(JSON.stringify({...inputValue, type:!privateType ? room : privateType, messageType: 'message', privateRoom }))
//       }

//     }

//     // const setRoom1 = (room='broadcast') => {
//     //   return () => {
//     //     setRoom(room)
//     //   }
      
//     // }
//     const setRoom1 = (room='broadcast') => {
//       return () => {
//         setRoom(room)
//       }
      
//     }

//     // const searchUser = (roomId) =>  {
      
//     //   ws.current.send(JSON.stringify({searchRoom: roomId, messageType: 'search_message'}))
      
//     // }

//     const searchUser = (roomId) =>  {
      
//       ws.current.send(JSON.stringify({searchRoom: roomId, messageType: 'search_message'}))
      
//     }

    
//     return (
//       <div className="body">
//         <div className="container">
//           <div className="row">
//             <Menu />
//             <section className="discussions">
//               {/* <SearchBar searchHandler={searchUser}/> */}
//               <SearchBar searchHandler={searchUser}/>

//               {/* <div>
//                 <DefaultDiscussion entranceRoom={entranceRoom} setRoom1={setRoom1()} room={room} setPrivateType={setPrivateType}/>
//               </div> */}
//               {/* {searchResult.map(({searchRoom}) => {

//                 return (
//                   <div key={v4()}>
//                     <Discussion entranceRoom={privateChat} setprivateRoom={setprivateRoom} privateRoom={searchRoom} setRoom={setRoom} setPrivateType={setPrivateType}/>
//                   </div>
//                 )
//               })} */}
             
//             </section>

//             <section className="chat">
//               <HeaderChat  onlineStatus={onlineStatus} username={room || privateRoom}/>
//               {/* <HeaderChat  onlineStatus={onlineStatus} username={room || privateRoom}/> */}
//               <div className="messages-chat">
               
//                 {!messages.length ? '' : messages.map(({message, date, socketId, comparisonId}) => {
//                   return (
//                   <div key={v4()} className={comparisonId ? 'right' : 'left' }>
//                     <Message text={message} comparisonId={comparisonId}  >
//                     <p className="userId">{socketId}</p>
//                     <p className="time"> {date}</p>how the chat system is implemented in telegram
//                 type="text"
//                 className="write-message"
//                 placeholder= "Type your message here"
//                 onChange={inputHandler(setInputValue,inputValue, 'message')}
//                 value={inputValue.message || ''}/>

//                 <i className="icon send clickable" onClick={buttonHandler(setAllowSend,allowSend,false, true, () => {
//                   sendMessage(inputValue)
//                   setInputValue({})
//                 } )}><SendMessageIcon /></i>

//               </div>
//             </section>
//           </div>
//         </div>
//       </div>
//     );
//   }


// export default Messenger;
