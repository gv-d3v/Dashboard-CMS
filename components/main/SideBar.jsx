"use client";
import FTPSVG from "@/app/styles/icons/FTPSVG";
import ManageSVG from "@/app/styles/icons/ManageSVG";
import MediaSVG from "@/app/styles/icons/MediaSVG";
import SettingsSVG from "@/app/styles/icons/SettingsSVG";
import Image from "next/image";
import Link from "next/link";

export default function SideBar({ id, pathname, mobile, setMobile }) {
  const startPath = `/dashboard/websites/${id}`;

  const handleMobileSideBar = () => {
    mobile === "" ? setMobile("mobile") : setMobile("");
  };
  const handleMobileSideBarClose = () => {
    mobile === "mobile" ? setMobile("") : null;
  };

  return (
    <div className={`side-bar ${mobile}`}>
      <div
        className={`side-bar-image-cont ${mobile}`}
        onClick={() => handleMobileSideBar()}
      >
        <Image
          width={60}
          height={60}
          src="/dashboard.png"
          alt="Logo"
        />
        <span>Sidebar</span>
      </div>
      <ul>
        <li className={pathname === `${startPath}/manage` ? "active" : ""}>
          <Link href={`./manage`}>
            <button onClick={() => handleMobileSideBarClose()}>
              <ManageSVG />
              Manage
            </button>
          </Link>
        </li>
        <li className={pathname === `${startPath}/media` ? "active" : ""}>
          <Link href={`./media`}>
            <button onClick={() => handleMobileSideBarClose()}>
              <MediaSVG /> Media
            </button>
          </Link>
        </li>
        <li className={pathname === `${startPath}/ftp` ? "active" : ""}>
          <Link href={`./ftp`}>
            <button onClick={() => handleMobileSideBarClose()}>
              <FTPSVG />
              File Manager
            </button>
          </Link>
        </li>
        <li className={`${pathname === `${startPath}/settings` ? "active" : ""}`}>
          <Link href={`./settings`}>
            <button onClick={() => handleMobileSideBarClose()}>
              <SettingsSVG />
              Settings
            </button>
          </Link>
        </li>
      </ul>
    </div>
  );
}
