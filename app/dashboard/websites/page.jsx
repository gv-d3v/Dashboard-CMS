"use client";
import { GetWebsites } from "@/app/calls/GetWebsites";
import Loading from "@/app/loading";
import SearchBar from "@/components/SearchBar";
import WebsiteList from "@/components/WebsiteList";
import React, { useEffect, useState } from "react";

const Websites = () => {
  const [allWebsites, setAllWebsites] = useState([]);
  const [filteredWebsites, setFilteredWebsites] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  //GET USERS
  const fetchData = async () => {
    const data = await GetWebsites();
    setAllWebsites(data);
    setIsLoading(false);
  };

  //GET USERS ON LOAD
  useEffect(() => {
    const fetchDataAndSetLoading = async () => {
      await fetchData();
    };

    fetchDataAndSetLoading();
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <div className="min-h-full">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 ">Websites</h1>
        </div>
      </header>
      <main>
        <div className="bg-gray-100 h-screen mt-0.5">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl py-4 sm:py-4 lg:max-w-none lg:py-4">
              <SearchBar
                setItems={setFilteredWebsites}
                items={allWebsites}
                placeholder={"website"}
                classAtt={"search-website"}
              />
              <WebsiteList websites={filteredWebsites} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Websites;
