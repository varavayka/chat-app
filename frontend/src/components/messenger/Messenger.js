import "./css/messenger.css";
import Menu from "./ Menu";
import SearchBar from "./SearchBar";
import Discussion from "./Discussion";
import HeaderChat from "./HeaderChat";
import Message from "./Message";
import SendMessageIcon from "./SvgSengMessageIcon";
import { useEffect, useState } from "react";
const Messenger = () => {
  const [permission, setPermisson] = useState(false);
  useEffect(() => {
    
    (async () => {
      // const createWsConection = async (url) => {
      //   const ws = new WebSocket(url)
      //   ws.onopen = () => ws.send(`ok `)
      // }
      // await createWsConection('ws://localhost:9091/')
      try {
        const response =  await fetch("http://localhost:9090/messenger", {
          method: "get",
          headers: {
            Authorization: `bearer ${
              JSON.parse(localStorage.getItem("jwt")).jwt
            }`,
          },
        });
        const {userAuthorized} = await response.json()
        if (userAuthorized) {
          return setPermisson(true);
        }
        if (!userAuthorized) {
          return setPermisson(false);
        }
      } catch (e) {
        console.log(e.message);
      }
    })();
  }, [permission]);

  if (permission) {
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
                <i className="icon send clickable">
                  <SendMessageIcon />
                </i>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }
  if (!permission) {
    return (
      <>
        <h1>Permission denied</h1>
        <a href="/">Авторизируйтесь для продолжения работы!</a>
      </>
    );
  }
};

export default Messenger;
