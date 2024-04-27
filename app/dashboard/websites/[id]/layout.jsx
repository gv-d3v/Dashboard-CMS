"use client";
import { useParams, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { GetWebsites } from "@/app/calls/GetWebsites";
import SideBar from "@/components/main/SideBar";
import Space from "@/components/Space";
import HandleScroll from "@/tools/handleScroll";
import checkPath from "@/tools/checkPath";

export default function WebsitesLayout({ children }) {
  const { id } = useParams();
  const pathname = usePathname();

  const [websites, setWebsites] = useState([]);

  const [headerS, setheaderS] = useState("");
  const [enableScroll, setEnableScroll] = useState(false);

  const [mobile, setMobile] = useState("");

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

  HandleScroll(84, setheaderS, "header-scroll", "", enableScroll);

  return websites.map((website, index) => {
    if (id === website._id.toString()) {
      return (
        <div
          className="min-h-full"
          key={index}
        >
          <header className={`bg-white shadow fixed w-full z-10 ${headerS} ${mobile}`}>
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 website-h">
              <h1 className={`text-3xl font-bold tracking-tight text-gray-900 ml-5`}>{website.name}</h1>
            </div>
            <SideBar
              id={id}
              pathname={pathname}
              mobile={mobile}
              setMobile={setMobile}
            />
          </header>
          <Space space={"84px"} />
          <main className="popupleft">{children}</main>
        </div>
      );
    }
  });
}
