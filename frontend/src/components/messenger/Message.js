import styles from "./css/message.module.css";

const Message = ({ responseAllow }) => {
  const { message, photo, online, response, textOnly } = styles;
  return (
    <div className={`${message} ${responseAllow ? textOnly : ""}`}>
      <div className={!responseAllow ? photo : ""}>
        <div className={online}></div>
      </div>
      <div className={responseAllow ? response : ""}>
        <p className="text"> Hi, how are you ? </p>
      </div>
    </div>
  );
};

export default Message;
