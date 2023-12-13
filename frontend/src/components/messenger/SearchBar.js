import styles from "./css/searchBar.module.css";
import { useState } from "react";
const SearchBar = ({getRequestUserRoom}) => {
  const { discussion, search, searchbar, input } = styles;
  const [searchInput, setSearchInput] = useState('')
  const [placeholderValue, setPlaceholderValue] = useState('')
  return (
    <div className={`${discussion} ${search}`}>
      <div className={`${searchbar}`}>
        <i className=""></i>
        <input 
         type="text"
         placeholder={placeholderValue || 'Search...'} 
         className={input} onChange={({target:{value}}) => setSearchInput(value)} 
         value={searchInput}/>
         
        <button onClick={() => {
          const backLog = getRequestUserRoom(searchInput)
          setPlaceholderValue(typeof backLog === 'string' ? backLog : "Search...")
          setSearchInput('')
        }
          
          }>Найти</button>
      </div>
    </div>
  );
};
export default SearchBar;
