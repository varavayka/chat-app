import styles from '../styles/headerChat.module.css'

function HeaderChat({onlineState}) {
    const {headerChatContainer,onlineStatus, username, offlineStatus} = styles
    const usernameChat = localStorage.getItem("JWT").split(",").slice(1)
    return (
        <div className={headerChatContainer}>
            <p className ={username}>{usernameChat.join(' ')}</p>
            <p className={ onlineState ? onlineStatus : offlineStatus}></p>
        </div>
    )

}

export default HeaderChat