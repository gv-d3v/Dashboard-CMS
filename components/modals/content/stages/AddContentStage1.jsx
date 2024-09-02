import React from "react";

export default function AddContentStage1(children) {
  return (
    <div>
      {" "}
      <div className="form-description-position single-input">
        <span className="form-description">Name</span>
        <input
          maxLength={24}
          type="text"
          value={children.name}
          placeholder="Name of accommodation"
          onChange={e => {
            children.setStage1Pass(false);
            children.setName(e.target.value);
            children.setError("");
          }}
        />
      </div>
      <div className="accommodation-field-position">
        <div className="form-description-position middle">
          <span className="form-description">Country</span>
          <input
            className="input-margin"
            type="text"
            placeholder="Country"
            onChange={e => {
              children.setStage1Pass(false);
              children.handleSearch(e);
              children.setError("");
            }}
            value={children.destination}
          />
        </div>
        <div className="form-description-position middle">
          <span className="form-description ">City</span>
          <input
            className="input-margin"
            type="text"
            value={children.city}
            placeholder="City"
            onChange={e => {
              children.setCity(e.target.value);
              children.setStage1Pass(false);
            }}
          />
        </div>
        <div className="form-description-position middle">
          <span className="form-description ">Address</span>
          <input
            type="text"
            placeholder="Address"
            value={children.address}
            onChange={e => {
              children.setAddress(e.target.value);
              children.setStage1Pass(false);
            }}
          />
        </div>
      </div>
      <div className="accommodation-field-position">
        <div className="form-description-position middle">
          <span className="form-description">Rooms</span>
          <input
            className="input-margin"
            type="number"
            value={children.rooms}
            placeholder="Number of rooms"
            onChange={e => {
              children.setStage1Pass(false);
              children.setRooms(e.target.value);
              children.setError("");
            }}
          />
        </div>
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
            />
            <label htmlFor={"Children"}>{"Children"}</label>
          </div>
        </div>
        <div className="form-description-position middle">
          <span className="form-description">Price</span>
          <input
            type="number"
            value={children.price}
            placeholder="Price per day"
            onChange={e => {
              children.setStage1Pass(false);
              children.setPrice(e.target.value);
              children.setError("");
            }}
          />
        </div>
      </div>
      <div className="form-description-position single-input">
        <span className="form-description">Description</span>
        <textarea
          value={children.description}
          type="text"
          placeholder="Short description about your accommodation"
          onChange={e => {
            children.setStage1Pass(false);
            children.setDescription(e.target.value);
            children.setError("");
          }}
        />
      </div>
    </div>
  );
}
