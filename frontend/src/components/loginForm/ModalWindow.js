import styles from "./css/modalWindow.module.css";

const ModalWindow = ({ stateModalWindow }) => {
  const { modal, contentWrapper, open, close, modalHeader, content } = styles;
  return (
    <div
      className={`${modal} ${stateModalWindow ? open : ""}`}
      data-modal="trigger-1"
    >
      <article className={contentWrapper}>
        <button className={close}></button>
        <header className={modalHeader}>
          <h2>This is a modal 1</h2>
        </header>
        <div className={content}>
          <p>
            Pellentesque habitant morbi tristique senectus et netus et malesuada
            fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae,
            ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam
            egestas semper. Aenean ultricies mi vitae est. Mauris placerat
            eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra.
            Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit
            amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros
            ipsum rutrum orci, sagittis tempus lacus enim ac dui.
          </p>
        </div>
      </article>
    </div>
  );
};

export default ModalWindow;
