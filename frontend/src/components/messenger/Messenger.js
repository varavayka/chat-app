import { useEffect,  useState,useRef} from "react";
import {v4} from 'uuid'
import styles from "./css/messenger.module.css";
// import Menu from "./ Menu";
import SearchBar from "./SearchBar";
import Discussion from "./Discussion";
// import HeaderChat from "./HeaderChat";
// import Message from "./Message";
// import SendMessageIcon from "./SvgSengMessageIcon";
// import inputHandler from "../../handlers/inputHandler";
// import buttonHandler from "../../handlers/buttonHandler";
import Chat from "./Chat";
const Messenger = () => {
    const {body, container,row_01, discussions} = styles
    const [allowSend, setAllowSend] = useState(false)
    const [onlineStatus,setOnlineStats] = useState(false)

    const [chats, setChats] = useState([])
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
            break

          case 'broadcast_message':
            setBroadCastMessage([...broadCastMessage, message])
            break
          
          case 'chat_message': 
            setChatMessage([...chatMessage, message])
            break
          
          case 'search_message':
            
            setResultSearchUser([...resultSearchUser, message])
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
          to: destenationChat

        }
        ws.current.send(JSON.stringify(messageInstance))
        setInputValue({})
      }

    }

    const searchHandlerUser = (chatId) =>  {
      ws.current.send(JSON.stringify({searchPattern: chatId, messageType: 'search_message'}))
    }

    
    return (
      <div className={body} onKeyDown={({key}) => key === 'Enter' ? sendMessage(inputValue): null}>
        <div className={container}>
          <div className={row_01}>
            
            <section className={discussions}>
              <SearchBar searchHandler={searchHandlerUser}/>
           
                {
                  resultSearchUser.map(({searchPattern,compareId}) => {
                    
                    if(searchPattern && compareId) {

                      return (
                        <div key={v4()}>
                          <Discussion setDestenationChat={setDestenationChat} chatId={searchPattern} setChats={setChats} chats={chats}/> 
                        </div>
                      )

                    }
                    return null
                  })
                }
               
                 
             
            </section>
            {
                  resultSearchUser.map(({searchPattern,compareId}) => {
                    
                    if(searchPattern && compareId) {

                      return (
                        <div key={v4()}>
                          <Chat messageList={chatMessage} destenationChat={destenationChat}  sendMessage={sendMessage}  />

                        </div>
                      )

                    }
                    return null
                  })
                }
          </div>
        </div>
      </div>
    );
  }


export default Messenger;
