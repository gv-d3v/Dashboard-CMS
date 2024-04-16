"use client";
import Image from "next/image";
import React, { useState } from "react";

export default function Settings() {
  const [laguange, setLaguange] = useState("en");

  return (
    <div>
      <div className="min-h-full">
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 ">Settings</h1>
          </div>
        </header>
        <main className="settings-main">
          <div className="settings-container">
            <div className="settings-option laguange">
              <span>Language:</span>
              <div className="settings-switch laguange">
                <div
                  className="settings-laguange sr"
                  onClick={() => setLaguange("en")}
                >
                  <Image
                    height={38}
                    width={38}
                    className={`serbian-lang ${laguange}`}
                    src="/serbian.png"
                    alt="Serbian Laguange"
                    unoptimized={true}
                  />
                  <span className={`serbian-lang ${laguange}`}>Serbian</span>
                </div>

                <div
                  className="settings-laguange"
                  onClick={() => setLaguange("sr")}
                >
                  <span className={`english-lang ${laguange}`}>English</span>
                  <Image
                    height={38}
                    width={38}
                    className={`english-lang ${laguange}`}
                    src="/english.png"
                    alt="English Laguange"
                    unoptimized={true}
                  />
                </div>
              </div>
            </div>
            <div className="settings-option">
              <span>Dark mode:</span>
              <div className="settings-switch">
                <label className="switch">
                  <input type="checkbox" />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>

            <button className="inline-flex w-full justify-center rounded-md bg-emerald-500 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-600 sm:ml-3 sm:w-auto">
              Save Changes
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
