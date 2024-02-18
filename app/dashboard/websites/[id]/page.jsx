"use client";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { websiteListDB } from "@/db/WebsiteListDB";
import SideBar from "@/components/SideBar";
import Manage from "@/components/sidebar-tabs/Manage";
import Media from "@/components/sidebar-tabs/Media";
import FTP from "@/components/sidebar-tabs/FTP";

export default function Website() {
  const { id } = useParams();
  const [tab, setTab] = useState(0);

  const showTab = () => {
    if (tab === 0) {
      return <Manage />;
    } else if (tab === 1) {
      return <Media />;
    } else {
      return <FTP />;
    }
  };

  return websiteListDB.map(website => {
    if (id === website.id.toString()) {
      return (
        <div
          className="min-h-full"
          key={website.id}
        >
          <header className="bg-white shadow">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 ">{website.name}</h1>
            </div>
            <SideBar
              tab={tab}
              setTab={setTab}
            />
          </header>
          <main className="websites-main">
            <div className="bg-gray-100 h-96">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl py-4 sm:py-4 lg:max-w-none lg:py-4">{showTab()}</div>
              </div>
            </div>
          </main>
        </div>
      );
    }
  });
}
