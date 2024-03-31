import React from "react";
import Test from "./test";

export default function Settings() {
  return (
    <div>
      <div className="min-h-full">
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 ">Settings</h1>
          </div>
        </header>
        <main className="mb-10">
          <Test/>
        </main>
      </div>
    </div>
  );
}
