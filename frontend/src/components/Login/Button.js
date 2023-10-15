import styles from './Button.module.css'

function Button({name, onClick}) {


    return (
        // <div className={styles.buttonWrapper}>
            <button className={styles.buttonForm} onClick={onClick}>{name}</button>
        // </div>
    )
}

export default Button