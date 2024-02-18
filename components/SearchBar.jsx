"use client";
import { websiteListDB } from "@/db/WebsiteListDB";
import React, { useEffect, useState } from "react";

const SearchBar = ({ setWebsites }) => {
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = () => {
    let filteredWebsites = [...websiteListDB];

    if (searchInput) {
      filteredWebsites = filteredWebsites.filter(website => website.name.toLowerCase().includes(searchInput.toLowerCase()));
    }
    setWebsites(filteredWebsites);
  };

  useEffect(() => {
    handleSearch();
  }, [searchInput]);

  return (
    <div className="search-website">
      <input
        type="text"
        name="search"
        id="search"
        className=""
        placeholder="Search for a webiste"
        onChange={e => setSearchInput(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
