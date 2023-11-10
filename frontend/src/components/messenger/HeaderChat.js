import styles from "./css/headerChat.module.css";
const HeaderChat = () => {
  const { headerChat, icon, name, clickable, right } = styles;
  const {username} = JSON.parse(atob(localStorage.getItem('jwt').split('.')[1]))
  
  return (
    <div className={headerChat}>
      <i className={icon}></i>
      <p className={name}>{username}</p>
      <i className={`${icon} ${clickable}  ${right}`}></i>
    </div>
  );
};

export default HeaderChat;
