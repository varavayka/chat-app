import styles from "./css/message.module.css";

const Message = ({ responseAllow, text, children, key}) => {
  const { message, photo, online, response, textOnly } = styles;
  console.log(children)
  return (
    
    <div className={`${message} ${responseAllow ? textOnly : ""}`}>
      
      <div className={!responseAllow ? photo : ""}>
        <div className={online}></div>
      </div>
      <div className={responseAllow ? response : ""}>
        {children[0]}
        <p className={`text`}> 
        {text} 
        </p>
        {children[1]}
      </div>
      
    </div>
  );
};

export default Message;
