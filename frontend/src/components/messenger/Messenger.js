import { useEffect,  useState,useRef, useCallback } from "react";
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
    const [messages, setMessages] = useState([])
    const [userInfo, setUserInfo] = useState([])
    const [userDiscussion, setUserDiscussion] = useState([])
    const ws = useRef(null)
    
    useEffect(() => {
      ws.current = new WebSocket('ws://localhost:8080/')
      ws.current.onopen = (({target:{readyState}}) => setOnlineStats(true))            
      return () =>  ws.current.close()
    },[])
    
    const addState = (info, stateVar) =>  setUserInfo([...stateVar, info])
    
    useEffect(() => {
      ws.current.onmessage = ({data}) => {
        const message = JSON.parse(data)
        const {type} = message 
        

        switch(type) {
          case 'user_info':
            addState(message, userInfo)
            break
          
          case 'user_message':
            setMessages([...messages, message])
            break
          
          default:
            break
        }
        
      }
    }, [messages, userInfo])
     
    function sendMessage(inputValue) {
      if(Object.values(inputValue).length) {
        ws.current.send(JSON.stringify({...inputValue, type: 'user_message'}))
        console.log(userInfo)
        console.log(messages)
      }
      
    }
    function getRequestUserRoom(requestRoom) {
      const [userFinded] = userInfo.map(({room}) => requestRoom === room)
      if(userFinded) {
        return setUserDiscussion([...userDiscussion, {userFinded, room: requestRoom}])
        
      }
      return 'Пользователь не найден'
    }
    
    return (
      <div className="body">
        <div className="container">
          <div className="row">
            <Menu />
            <section className="discussions">
              <SearchBar  getRequestUserRoom={getRequestUserRoom}/>
              {userDiscussion.map(({room}) => {

                return (
                  <div key={v4()}>
                    <Discussion msg={inputValue} roomId={room}/>

                  </div>
                )
              })}
            </section>

            <section className="chat">
              <HeaderChat  onlineStatus={onlineStatus}/>
              <div className="messages-chat">
               
                {!messages.length ? '' : messages.map(({message, date, socketId, result}) => {
                  return (
                  <div key={v4()} className={result ? 'right' : 'left' }>
                    <Message text={message} result={result}  >
                    <p className="userId">{socketId}</p>
                    <p className="time"> {date}</p>
                    </Message>
                    </div>)
                })}
              </div>
              <div className="footer-chat">

                <input 
                type="text"
                className="write-message"
                placeholder= "Type your message here"
                onChange={inputHandler(setInputValue,inputValue, 'message')}
                value={inputValue.message || ''}/>

                <i className="icon send clickable" onClick={buttonHandler(setAllowSend,allowSend,false, true, () => {
                  sendMessage(inputValue)
                  setInputValue({})
                } )}><SendMessageIcon /></i>

              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }


export default Messenger;



