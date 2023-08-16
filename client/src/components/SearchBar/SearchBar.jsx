import { useState, useEffect } from "react";
import styles from "./SearchBar.module.css";
import { useDispatch } from "react-redux";
import { onSearch } from "../../Redux/Action/action";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const handleInput = (event) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    dispatch(onSearch(searchTerm));
  };

  return (
    <form className={styles.form}>
      <input
        className={styles.input}
        type="text"
        name="search"
        id="search"
        onChange={handleInput}
        placeholder="Search for a dog / breed"
        value={searchTerm}
      />
      <button type="button" 
      onClick={handleSearch}
      className={styles.btnSearch}
      >
        search
      </button>
    </form>
  );
};

export default SearchBar;
