import styles from "./css/discussion.module.css";

import { useEffect , useRef} from "react";
const Discussion = ({setDestenationChat, chatId, setChats, chats}) => {
  const { discussion, photo, online, descContact, name, message, timer } = styles;
  
 
  return (

    <div className={discussion} onClick={() => {
      setDestenationChat(chatId)
      setChats([...chats, {chat: chatId}])
      }}>
      
      <div className={photo}>
        <div className={online}></div>
      </div>
      <div className={descContact}>
        <p className={name}>{chatId}</p>
        <p className={message}> </p>
        {/* { msg ? comparisonId ? `Вы: ${msg}` : `${room}: ${msg}`: ''} */}
      </div>

      {/* {
        date?.split(' ')[4] 
        ? <div className={timer}>{date?.split(' ')[4].split(':').slice(0,2).join(':')}</div> 
        : null
      } */}
      
    </div>
  );
};

export default Discussion;
