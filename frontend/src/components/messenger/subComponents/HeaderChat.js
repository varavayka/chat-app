import styles from '../styles/headerChat.module.css'

function HeaderChat({onlineState}) {
    const {headerChatContainer,onlineStatus, username, offlineStatus} = styles
    return (
        <div className={headerChatContainer}>
            <p className ={username}>username</p>
            <p className={ onlineState ? onlineStatus : offlineStatus}></p>
        </div>
    )

}

export default HeaderChat