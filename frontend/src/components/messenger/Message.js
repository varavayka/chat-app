import styles from "./css/message.module.css";

const Message = ({ responseAllow, text:messageText, children}) => {
  const { message, photo, online, response, textOnly,text } = styles;
  
  return (
    <div className={`${message}`}>
      {/* ${responseAllow ? textOnly : ""} */}
      <div className={photo}>
      {/* !responseAllow ? photo : "" */}
        <div className={online}></div>
      </div>

      <div className={responseAllow ? response : ""}>
        {children[0]}
        <p className={text}> 
        {messageText} 
        </p>
        {children[1]}
      </div>
      
    </div>
  );
};

export default Message;
