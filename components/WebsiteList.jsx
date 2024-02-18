import Link from "next/link";
import React from "react";

const WebsiteList = () => {
  const websiteList = [
    {
      id: 1,
      name: "BookinGo",
      domen: "bookingo.com",
      link: "https://booking-hazel-xi.vercel.app/",
      hostType: "Premium managment",
    },
    {
      id: 2,
      name: "VideoZone",
      domen: "videozone.com",
      link: "https://demo2.oddgenetics.com/",
      hostType: "Premium managment",
    },
    {
      id: 3,
      name: "OddGenetics",
      domen: "oddgenetics.com",
      link: "https://oddgenetics.com/",
      hostType: "Premium managment",
    },
    {
      id: 4,
      name: "Xquisite",
      domen: "xquisite.com",
      link: "https://demo1.oddgenetics.com/",
      hostType: "Premium managment",
    },
  ];
  return (
    <div className="website-list">
      <ul>
        {websiteList.map(website => {
          return (
            <div key={website.id}>
              <li>
                <img src="/www.png" />
                <div className="name-type-section">
                  <span className="website-name">{website.name}</span>
                  <span className="website-link">
                    <a
                      href={website.link}
                      target="_blank"
                    >
                      {website.domen}
                    </a>
                  </span>
                  <span className="website-type">{website.hostType}</span>
                </div>
                <button className="manage-button">
                  <Link href={`./websites/${website.id}`}>Manage</Link>
                </button>
              </li>
              {website.id < websiteList.length ? <hr className="line-break" /> : null}
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default WebsiteList;
