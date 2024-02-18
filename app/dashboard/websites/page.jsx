import SearchBar from "@/components/SearchBar";
import WebsiteList from "@/components/WebsiteList";
import React from "react";

const Websites = () => {
  return (
    <div className="min-h-full">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 ">Websites</h1>
        </div>
      </header>
      <main>
        <div className="bg-gray-100 h-auto">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl py-4 sm:py-4 lg:max-w-none lg:py-4">
              <SearchBar />
              <WebsiteList />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Websites;
