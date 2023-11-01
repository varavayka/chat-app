import styles from "./css/searchBar.module.css";

const SearchBar = () => {
  const { discussion, search, searchbar, input } = styles;
  return (
    <div className={`${discussion} ${search}`}>
      <div className={`${searchbar}`}>
        <i className=""></i>
        <input type="text" placeholder="Search..." className={input} />
      </div>
    </div>
  );
};
export default SearchBar;
