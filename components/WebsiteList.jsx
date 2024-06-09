import Image from "next/image";
import Link from "next/link";

const WebsiteList = ({ websites }) => {
  if (websites.length > 0) {
    return (
      <div className="website-list">
        <ul>
          {websites.map((website, index) => {
            return (
              <div key={index}>
                <li>
                  <Image
                    src="/www.png"
                    width={50}
                    height={50}
                    alt="website-image-logo"
                    priority={true}
                  />
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
                    href={`./websites/${website._id}/manage`}
                    id="manage-button"
                  >
                    <button className="manage-button shadow">Manage</button>
                  </Link>
                </li>
                {index < websites.length - 1 ? <hr className="line-break" /> : null}
              </div>
            );
          })}
        </ul>
      </div>
    );
  } else {
    return (
      <div className="no-results">
        <span>No sites match your search criteria</span>
      </div>
    );
  }
};

export default WebsiteList;
