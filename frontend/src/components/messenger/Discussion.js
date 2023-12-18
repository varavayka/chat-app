import styles from "./css/discussion.module.css";

// import { useEffect , useRef} from "react";
const Discussion = ({entranceRoom, setRoom1, room: frontRoom}) => {
  const { discussion, photo, online, descContact, name, message, timer } = styles;
  const {room, msg,date, comparisonId} = entranceRoom
  
   
  return (

    <div className={discussion} onClick={setRoom1()}>
      
      <div className={photo}>
        <div className={online}></div>
      </div>
      <div className={descContact}>
        <p className={name}>Общий чат</p>
        <p className={message}> { msg ? comparisonId ? `Вы: ${msg}` : `${room}: ${msg}`: ''}</p>
      </div> 
      {
        date?.split(' ')[4] 
        ? <div className={timer}>{date?.split(' ')[4]}</div> 
        : null
      }
      {/* {
        room
        ? 
        <div className={timer}>{room}</div>
        : null
      } */}
      
    </div>
  );
};

export default Discussion;
