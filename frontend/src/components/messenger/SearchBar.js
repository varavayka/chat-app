import styles from "./css/searchBar.module.css";
import { useEffect , useState} from "react";
const SearchBar = () => {
  const { discussion, search, searchbar, input } = styles;
  const [allow,setAllow] = useState(false)
  const [inputValue, setInputValue] = useState('')
  useEffect(() => {
    async function searchUser() {
      try {
        const {userFinded, id}  = await (await fetch(`http://localhost:9090/search?userId=${inputValue}&token=${sessionStorage.getItem('jwt')}`)).json()
        console.log(userFinded, id)
      }catch(e) {
        console.log(e)
      }

    }
    if(allow) {
      searchUser()
      setAllow(false)
    }
  },[allow])
  return (
    <div className={`${discussion} ${search}`}>
      <div className={`${searchbar}`}>
        <i className=""></i>
        <input type="text" placeholder="Search..." className={input} onChange={({target:{value}}) => setInputValue(value)}  value={inputValue}/>
        <button onClick={() => setAllow(true)}>Найти</button>
      </div>
    </div>
  );
};
export default SearchBar;
