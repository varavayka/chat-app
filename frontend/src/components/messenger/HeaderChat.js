import styles from "./css/headerChat.module.css";
const HeaderChat = () => {
  const { headerChat, icon, name, clickable, right } = styles;
  return (
    <div className={headerChat}>
      <i className={icon}></i>
      <p className={name}>Megan Leib</p>
      <i className={`${icon} ${clickable}  ${right}`}></i>
    </div>
  );
};

export default HeaderChat;
