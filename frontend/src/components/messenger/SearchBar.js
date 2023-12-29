import { useState } from "react";
import styles from "./css/searchBar.module.css";

const SearchBar = ({searchHandler, showChatList}) => {
  const [inputData, setInputData] = useState('')
  const { discussion, search, searchbar, input, searchBarButton ,chatsList} = styles;
  return (
    <div className={`${discussion} ${search}`}>
      <div className={chatsList} onClick={showChatList}>
      </div>
      <div className={`${searchbar}`}>
        <i className=""></i>
        <input 
         type="text"
         placeholder='Search...'
         className={input}
         onChange={({target:{value}}) => setInputData(value) }
         value={inputData}
        />
        <button onClick={() => {
          searchHandler(inputData)
          setInputData('')
          }} className={searchBarButton}>Найти</button>
      </div>
    </div>
  );
};
export default SearchBar;
