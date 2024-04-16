"use client";
import { useEffect, useState } from "react";

const SearchBar = ({ setItems, items, placeholder, classAtt }) => {
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = () => {
    let filteredItems = [...items];

    if (searchInput) {
      filteredItems = filteredItems.filter(item => item.name.toLowerCase().includes(searchInput.toLowerCase()));
    }

    setItems(filteredItems);
  };

  useEffect(() => {
    handleSearch();
  }, [searchInput]);

  return (
    <div className={`search ${classAtt}`}>
      <input
        type="text"
        name="search"
        id="search"
        className=""
        placeholder={`Search for a ${placeholder}`}
        onChange={e => setSearchInput(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
