import "./css/messenger.css";
import Menu from "./ Menu";
import SearchBar from "./SearchBar";
import Discussion from "./Discussion";
import HeaderChat from "./HeaderChat";
import Message from "./Message";
import SendMessageIcon from "./SvgSengMessageIcon";
const Messenger = () => {
  return (
    <div className="body">
      <div className="container">
        <div className="row">
          <Menu />
          <section className="discussions">
            <SearchBar />
            <Discussion />
          </section>

          <section className="chat">
            <HeaderChat />
            <div className="messages-chat">
              <Message />
              <p className="time"> 15h09</p>

              <Message responseAllow={true} />
              <p className="response-time time"> 15h04</p>
            </div>
            <div className="footer-chat">
              <input
                type="text"
                className="write-message"
                placeholder="Type your message here"
              ></input>
              <i className="icon send clickable" aria-hidden="true">
                <SendMessageIcon />
              </i>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Messenger;
