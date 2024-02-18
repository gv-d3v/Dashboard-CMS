import Link from "next/link";
import React from "react";
import { websiteListDB } from "@/db/WebsiteListDB";

const WebsiteList = ({ websites }) => {

  return (
    <div className="website-list">
      <ul>
        {websites.map(website => {
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
                <Link
                  href={`./websites/${website.id}`}
                  id="manage-button"
                >
                  <button className="manage-button">Manage</button>
                </Link>
              </li>
              {website.id < websiteListDB.length ? <hr className="line-break" /> : null}
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default WebsiteList;
