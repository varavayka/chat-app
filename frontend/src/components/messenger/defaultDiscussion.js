import styles from "./css/discussion.module.css";

import { useEffect , useRef} from "react";
const DefaultDiscussion = ({entranceRoom, setRoom1, setPrivateType}) => {
  const { discussion, photo, online, descContact, name, message, timer } = styles;
  const {room, msg,date, comparisonId} = entranceRoom
  
  const previevMessage = (msg) => msg ? comparisonId ? `Вы: ${msg}` : `${room}: ${msg}`: ''
  const dateFormatter = (date) => {

    if(date?.split(' ')[4]) {
        const formatDate = date.split(' ')[4].split(':').slice(0,2).join(':')
        return (
            <div className={timer}>{formatDate}</div> 
        )
    }
       
  }
  
  return (

    <div className={discussion} onClick={() => {
        setRoom1()
        setPrivateType(false)
        }}>
      
      <div className={photo}>
        <div className={online}></div>
      </div>
      <div className={descContact}>
        <p className={name}>Общий чат</p>
        <p className={message}> {previevMessage(msg)}</p>
      </div>

      {dateFormatter(date)}
      
    </div>
  );
};

export default DefaultDiscussion;
