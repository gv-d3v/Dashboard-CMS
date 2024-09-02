import React from "react";

export default function EditContentStage1(children) {
  return (
    <div>
      {" "}
      <div className="form-description-position single-input">
        <span className="form-description">Name</span>
        <input
          type="text"
          placeholder="Name of accommodation"
          onChange={e => {
            children.setName(e.target.value);
            children.setError("");
          }}
          value={children.name}
        />
      </div>
      <div className="accommodation-field-position">
        {" "}
        <div className="form-description-position middle">
          <span className="form-description">Country</span>
          <input
            className="input-margin"
            type="text"
            placeholder="Country"
            onChange={e => {
              children.handleSearch(e);
              children.setError("");
            }}
            value={children.destination}
          />{" "}
        </div>{" "}
        <div className="form-description-position middle">
          <span className="form-description">City</span>
          <input
            className="input-margin"
            type="text"
            placeholder="City"
            onChange={e => children.setCity(e.target.value)}
            value={children.city}
          />{" "}
        </div>{" "}
        <div className="form-description-position middle">
          <span className="form-description">Address</span>
          <input
            type="text"
            placeholder="Address"
            onChange={e => children.setAddress(e.target.value)}
            value={children.address}
          />{" "}
        </div>
      </div>
      <div className="accommodation-field-position">
        {" "}
        <div className="form-description-position middle">
          <span className="form-description">Rooms</span>
          <input
            className="input-margin"
            type="number"
            placeholder="Number of rooms"
            onChange={e => {
              children.setRooms(e.target.value);
              children.setError("");
            }}
            value={children.rooms}
          />{" "}
        </div>{" "}
        <div className="guests-box">
          <div className="form-description-position middle guests">
            <span className="form-description">Guests</span>
            <input
              className="input-margin"
              type="number"
              value={children.guests}
              placeholder="Number of guests"
              onChange={e => {
                children.setStage1Pass(false);
                children.setGuests(e.target.value);
                children.setError("");
              }}
            />
          </div>
          <div className="children-allowed">
            <input
              type="checkbox"
              id={"Children"}
              name={"Children"}
              value={"Children"}
              onChange={e => children.setChildrenAllowed(e.target.checked)}
              checked={children.childrenAllowed}
            />
            <label htmlFor={"Children"}>{"Children"}</label>
          </div>
        </div>
        <div className="form-description-position middle">
          <span className="form-description">Price</span>
          <input
            type="number"
            placeholder="Price per day"
            onChange={e => {
              children.setPrice(e.target.value);
              children.setError("");
            }}
            value={children.price}
          />{" "}
        </div>
      </div>
      <div className="form-description-position single-input">
        <span className="form-description">Description</span>
        <textarea
          type="text"
          placeholder="Short description about your accommodation"
          onChange={e => {
            children.setDescription(e.target.value);
            children.setError("");
          }}
          value={children.description}
        />
      </div>
    </div>
  );
}
