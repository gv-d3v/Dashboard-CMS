"use client";

import React, { useEffect, useState } from "react";

const LocationDropdown = ({ showDestinationDrop, destMenuRef, handleDestinationHide, setDestination, popupLeft, searchedDestination }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <React.Fragment>
      <div
        style={{ display: isVisible ? "block" : "none", left: `${popupLeft + 55}px`, top: "190px" }}
        className={`dropdown-menu destination list ${searchedDestination.length > 0 ? showDestinationDrop : null}`}
        ref={destMenuRef}
        onClick={() => handleDestinationHide()}
      >
        <ul className="country-ul">
          {searchedDestination.map((destination, index) => {
            return (
              <li
                className="cursor-pointer"
                key={index + 1}
                onClick={e => setDestination(e.target.innerText)}
              >
                <span>{destination.country}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </React.Fragment>
  );
};

export default LocationDropdown;
