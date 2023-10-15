import styles from '../styles/searchBarContainer.module.css'

function SearchBarChatsContainer({buttonName ,placeholder}) {
    const {searchBar,inputSearchBar, buttonSearchBar} = styles
    return (<div className={searchBar}>
        <input type="text" className={inputSearchBar} placeholder={placeholder} />
        <button className={buttonSearchBar}>{buttonName}</button>
      </div>)
}

export default SearchBarChatsContainer