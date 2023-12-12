import styles from "./css/discussion.module.css";
// import { useEffect , useRef} from "react";
const Discussion = () => {
  const { discussion, photo, online, descContact, name, message, timer } =
    styles;
    
   
  return (
    <div className={discussion} >
      <div className={photo}>
        <div className={online}></div>
      </div>
      <div className={descContact}>
        <p className={name}>Dave Corlew</p>
        <p className={message}>Let's meet for a coffee or something today ?</p>
      </div>
      <div className={timer}>3 min</div>
    </div>
  );
};

export default Discussion;
