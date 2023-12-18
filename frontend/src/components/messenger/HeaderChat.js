import styles from "./css/headerChat.module.css";
const HeaderChat = ({onlineStatus, username=null}) => {
  const { headerChat, icon, name, clickable, right, online, offline } = styles;
  
  
  return (
    <div className={headerChat}>
      <p className={name}>{username === 'broadcast' ? 'Общий чат': username}</p>
      <p className={ username ? onlineStatus ? online : offline : null}></p>
      <i className={icon}></i>
      <i className={`${icon} ${clickable}  ${right}`}></i>
    </div>
  );
};

export default HeaderChat;
