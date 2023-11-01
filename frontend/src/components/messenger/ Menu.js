import styles from "./css/menu.module.css";
const Menu = () => {
  const { menu, items, item } = styles;
  return (
    <nav className={menu}>
      <ul className={items}>
        <li className={item}>
          <i className="" ></i>
        </li>
        <li className={item}>
          <i className="" ></i>
        </li>
        <li className={item}>
          <i className="" ></i>
        </li>
        <li className={item}>
          <i className="" ></i>
        </li>
        <li className={item}>
          <i className="" ></i>
        </li>
        <li className={item}>
          <i className="" ></i>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
