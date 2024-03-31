import FTPSVG from "@/app/styles/icons/FTPSVG";
import ManageSVG from "@/app/styles/icons/ManageSVG";
import MediaSVG from "@/app/styles/icons/MediaSVG";
import SettingsSVG from "@/app/styles/icons/SettingsSVG";
import Link from "next/link";

export default function SideBar({ id, pathname }) {
  const startPath = `/dashboard/websites/${id}`;

  return (
    <div className="side-bar">
      <img
        src="/dashboard.png"
        alt="Logo"
      />
      <ul>
        <li className={pathname === `${startPath}/manage` ? "active" : ""}>
          <Link href={`./manage`}>
            <button>
              <ManageSVG />
              Manage
            </button>
          </Link>
        </li>
        <li className={pathname === `${startPath}/media` ? "active" : ""}>
          <Link href={`./media`}>
            <button>
              <MediaSVG /> Media
            </button>
          </Link>
        </li>
        <li className={pathname === `${startPath}/ftp` ? "active" : ""}>
          <Link href={`./ftp`}>
            <button>
              <FTPSVG />
              FTP
            </button>
          </Link>
        </li>
        <li className={`${pathname === `${startPath}/settings` ? "active" : ""}`}>
          <Link href={`./settings`}>
            <button>
              <SettingsSVG />
              Settings
            </button>
          </Link>
        </li>
      </ul>
    </div>
  );
}
