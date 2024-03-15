"use client";
import { useParams, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import SideBar from "@/components/SideBar";
import Manage from "@/components/sidebar-tabs/Manage";
import Media from "@/components/sidebar-tabs/Media";
import FTP from "@/components/sidebar-tabs/FTP";
import WebsiteSettings from "@/components/sidebar-tabs/WebsiteSettings";
import { GetWebsites } from "@/app/calls/GetWebsites";
import Space from "@/components/Space";
import HandleScroll from "@/components/tools/handleScroll";
import checkPath from "@/components/tools/checkPath";

export default function Website() {
  const { id } = useParams();
  const pathname = usePathname();

  const [tab, setTab] = useState(0);

  const [websites, setWebsites] = useState([]);

  const [headerS, setheaderS] = useState("");
  const [enableScroll, setEnableScroll] = useState(false);

  //GET USERS
  const fetchData = async () => {
    const data = await GetWebsites();
    setWebsites(data);
  };

  //GET USERS ON LOAD
  useEffect(() => {
    const fetchDataAndSetLoading = async () => {
      await fetchData();
      checkPath(pathname, setEnableScroll);
    };

    fetchDataAndSetLoading();
  }, []);

  const activeTab = () => {
    if (tab === 0) {
      return <Manage websites={websites} />;
    } else if (tab === 1) {
      return <Media />;
    } else if (tab === 2) {
      return <FTP />;
    } else if (tab === 3) {
      return <WebsiteSettings />;
    }
  };

  HandleScroll(84, setheaderS, "header-scroll", "", enableScroll);

  return websites.map((website, index) => {
    if (id === website._id.toString()) {
      return (
        <div
          className="min-h-full"
          key={index}
        >
          <header className={`bg-white shadow fixed w-full z-10 ${headerS}`}>
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 website-h">
              <h1 className={`text-3xl font-bold tracking-tight text-gray-900`}>{website.name}</h1>
            </div>
            <SideBar
              tab={tab}
              setTab={setTab}
            />
          </header>
          <Space space={"84px"} />
          <main className="websites-main">
            <div className="bg-gray-100 h-auto min-h-screen pt-1">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xllg:max-w-none">{activeTab()}</div>
              </div>
            </div>
          </main>
        </div>
      );
    }
  });
}
