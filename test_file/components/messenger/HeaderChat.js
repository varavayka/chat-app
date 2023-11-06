import styles from "./css/headerChat.module.css";
import React from "react";
const HeaderChat = () => {
  const { headerChat, icon, name, clickable, right } = styles;
  return (
    <div className={headerChat}>
      <i className={icon} aria-hidden="true"></i>
      <p className={name}>Megan Leib</p>
      <i className={`${icon} ${clickable}  ${right}`} aria-hidden="true"></i>
    </div>
  );
};

export default HeaderChat;
