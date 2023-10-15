import styles from '../styles/messengerButton.module.css'

function MessengerButton({name, onClick}) {
    const {sendMessage} = styles
    return (<button className ={sendMessage} onClick={onClick}>{name}</button>)
}

export default MessengerButton