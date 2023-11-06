import styles from "./css/discussion.module.css";
import React from "react";
const Discussion = ({onClick}) => {
  const { discussion, photo, online, descContact, name, message, timer } =
    styles;
  return (
    <div className={discussion} onClick={onClick}>
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
