import { useEffect,  useState,useRef, useCallback } from "react";
import {v4} from 'uuid'
import "./css/messenger.css";
import Menu from "./ Menu";
import SearchBar from "./SearchBar";
import Discussion from "./Discussion";
import HeaderChat from "./HeaderChat";
import Message from "./Message";
import SendMessageIcon from "./SvgSengMessageIcon";
import PermissionDenied from "../PermissonDenied";
import httpAuthorization from "../../httpRequests/httpAuthorization";
import {EventEmitter} from 'events'
import inputHandler from "../../handlers/inputHandler";
import buttonHandler from "../../handlers/buttonHandler";
const Messenger = () => {
    const [permission,setPermission] = useState(false)
    const [allowSend, setAllowSend] = useState(false)
    const [onlineStatus,setOnlineStats] = useState(false)
    const [inputValue,setInputValue] = useState({})
    const [messages, setMessages] = useState([])
    const ws = useRef(null)
    useEffect(() => {
      ws.current = new WebSocket('ws://localhost:8081/')
      ws.current.onopen = (({target:{readyState}}) => setOnlineStats(true))            
      return () =>  ws.current.close()
    },[])
    
    useEffect(() => {
      ws.current.onmessage = ({data}) => {
        const message = JSON.parse(data)
        // const {userId} = message
        setMessages([...messages, message])
      }
    }, [messages])
     
    function sendMessage(inputValue) {
      if(inputValue)
      ws.current.send(JSON.stringify(inputValue))
    }
  
    useEffect(() => {
      async function authorization() {
        const dataRequest = {
          headers: {'Authorization': `bearer ${localStorage.getItem('jwt')}`},
          method:'GET'
        }
        const authorizationStatus =  await httpAuthorization('http://localhost:9090/messenger',dataRequest)
        return setPermission(authorizationStatus)
        
      }
      authorization()
    }, [permission])
    return (
      !permission ? <PermissionDenied/> :
      <div className="body">
        <div className="container">
          <div className="row">
            <Menu />
            <section className="discussions">
              <SearchBar />
              <Discussion msg={inputValue}/>
            </section>

            <section className="chat">
              <HeaderChat  onlineStatus={onlineStatus}/>
              <div className="messages-chat">
               
                {!messages.length ? '' : messages.map(({message, date,messageId, result}) => {

                  return (
                  <div key={v4()} className={result ? 'right' : 'left' }>
                    <Message text={message} result={result}  >
                    <p className="time">{messageId}</p>
                    <p className="time"> {date}</p>
                    </Message>
                    </div>)
                })}
              </div>
              <div className="footer-chat">
                <input onKeyDown={({key}) => key=== 'Enter' ? sendMessage(inputValue): ''} type="text"className="write-message"placeholder="Type your message here" onChange={inputHandler(setInputValue,inputValue, 'message')} value={inputValue.message || ''}/>
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



