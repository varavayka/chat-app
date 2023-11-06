import "./css/chatMenu.css";
const ChatMenu = () => {
  return (
    <>
      <input className="menu-checkbox" id="menu" type="checkbox" name="menu" />
      <nav className="menu">
        <label className="menu-dots" for="menu">
          <span className="menu-dot"></span>
          <span className="menu-dot"></span>
          <span className="menu-dot"></span>
        </label>
        <ul className="menu-items">
          <li className="menu-item"></li>
          <li className="menu-item"></li>
          <li className="menu-item"></li>
          <li className="menu-item"></li>
          <li className="menu-item"></li>
          <li className="menu-item"></li>
        </ul>
        <label for="menu" className="menu-closer-overlay"></label>
      </nav>
    </>
  );
};

export default ChatMenu;
