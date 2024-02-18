import FTPSVG from "@/app/styles/icons/FTPSVG";
import ManageSVG from "@/app/styles/icons/ManageSVG";
import MediaSVG from "@/app/styles/icons/MediaSVG";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

export default function SideBar({ tab, setTab }) {
  const { id } = useParams();

  return (
    <div className="side-bar">
      <img
        src="/dashboard.png"
        alt="Logo"
      />
      <ul>
        <li
          className={tab === 0 ? "active" : ""}
          onClick={() => setTab(0)}
        >
          {/* <Link href={`./${id}`}>Manage</Link> */}
          <button>
            {" "}
            <ManageSVG />
            Manage
          </button>
        </li>
        <li
          className={tab === 1 ? "active" : ""}
          onClick={() => setTab(1)}
        >
          {/* <Link href={`./${id}/media`}>Media</Link> */}
          <button>
            <MediaSVG /> Media
          </button>
        </li>
        <li
          className={tab === 2 ? "active" : ""}
          onClick={() => setTab(2)}
        >
          {/* <Link href={`./${id}/ftp`}>FTP</Link> */}
          <button>
            <FTPSVG />FTP
          </button>
        </li>
      </ul>
    </div>
  );
}
