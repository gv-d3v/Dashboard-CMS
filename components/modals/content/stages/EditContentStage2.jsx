import React from "react";
import { amenitiesList } from "@/app/styles/icons/amenities icons/amenitiesList";

export default function EditContentStage2({ amenities, setAmenities }) {
  const chunkArray = (array, chunkSize) => {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };

  // Chunk the amenities array into groups of 4
  const chunkedAmenities = chunkArray(amenitiesList, 4);

  const handleCheck = e => {
    if (e.target.checked === true) {
      //amenities.push(e.target.value);
      setAmenities(prevAmenities => [...prevAmenities, e.target.value]);
    } else if (e.target.checked === false) {
      //amenities.splice(amenities.indexOf(e.target.value), 1);
      setAmenities(amenities.filter(item => item !== e.target.value));
    }
  };

  return (
    <div className="amenities">
      <h1>Amenities</h1>
      {chunkedAmenities.map((chunk, index) => (
        <div
          className="amenities-row"
          key={index}
        >
          {chunk.map((amenitie, idx) => (
            <div
              className="amenities-checkbox-container"
              key={idx}
            >
              <input
                type="checkbox"
                id={amenitie.name}
                name={amenitie.name}
                value={amenitie.name}
                onChange={e => handleCheck(e)}
                checked={amenities.includes(amenitie.name)}
              />
              <label htmlFor={amenitie.name}>
                {amenitie.icon}
                {amenitie.name}
              </label>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
