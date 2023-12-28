import styles from "./css/searchBar.module.css";
import { useState } from "react";
const SearchBar = ({searchHandler}) => {
  const [inputData, setInputData] = useState('')
  const { discussion, search, searchbar, input, searchBarButton } = styles;
  return (
    <div className={`${discussion} ${search}`}>
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
