// import styles from './account.module.css'
// import "./account.css";
import Button from "../Login/Button";
function Account({ username, setRedirectChat}) {
  return (
    <aside class="profile-card">
      <header>
        {/* <a target="_blank" href="#">
          <img
            src="http://lorempixel.com/150/150/people/"
            class="hoverZoomLink"
          />
        </a> */}

        <h1>{!username ? "user name" : username.split(",").join(" ")}</h1>

        <h2>Меню функций</h2>
      </header>

      <div className="profile-bio">
        <p>
          It takes monumental improvement for us to change how we live our
          lives. Design is the way we access that improvement.
        </p>
        <Button name="Настройки " />
        <Button
          name="Чат"
          onClick={(e) => {
            setRedirectChat(true);
          }}
        />
        <Button name="Выход " />
      </div>
    </aside>
  );
}

export default Account;
