import styles from "./css/headerChat.module.css";
const HeaderChat = ({onlineStatus}) => {
  const { headerChat, icon, name, clickable, right, online, offline } = styles;
  const {username} = JSON.parse(atob(localStorage.getItem('jwt').split('.')[1]))
  
  return (
    <div className={headerChat}>
      <p className={name}>{username}</p>
      <p className={onlineStatus ? online : offline}></p>
      <i className={icon}></i>
      <i className={`${icon} ${clickable}  ${right}`}></i>
    </div>
  );
};

export default HeaderChat;
