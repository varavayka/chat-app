import styles from '../styles/textAreaMessage.module.css'

function TextArea({placeholder, onChange , value}) {
    const {textAreaMessage} = styles
    return (<textarea
    className={textAreaMessage}
    placeholder={placeholder}
    onChange={onChange}
    value={value}
  />)
}

export default TextArea