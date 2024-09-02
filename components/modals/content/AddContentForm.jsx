"use client";

import React, { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { debounce } from "lodash";
import countries from "@/db/Countries";
import { v4 as uuidv4 } from "uuid";
import handleUpload from "../../upload/handleUpload";
import Loading from "@/app/loading";
import dynamic from "next/dynamic";
import TestFieldsContentReg from "@/tools/testFieldsContentReg";
import AddContentStage1 from "./stages/AddContentStage1";
import AddContentStage3 from "./stages/AddContentStage3";
import AddContentStage2 from "./stages/AddContentStage2";

const DynamicLoadLocationDropdown = dynamic(() => import("../../dropdowns/LocationDropdown"), {
  ssr: false,
});
const DynamicLoadPrepareUpload = dynamic(() => import("../../upload/prepareUpload"), {
  ssr: false,
});

export default function AddContentForm({ setOpenAdd, cancelButtonRef, fetchData, progress, setProgress, setStage1Pass }) {
  const router = useRouter();
  const { id } = useParams();
  const websiteId = id;
  const accommId = uuidv4();

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  //Search states and refs
  const destMenuRef = useRef(null);
  const uploadRef = useRef(null);

  const [name, setName] = useState("");

  const [destination, setDestination] = useState("");
  const [showDestinationDrop, setShowDestinationDrop] = useState("");
  const [searchedDestination, setSearchedDestination] = useState([]);

  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [rooms, setRooms] = useState("");
  const [guests, setGuests] = useState("");
  const [childrenAllowed, setChildrenAllowed] = useState(false);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [amenities, setAmenities] = useState([]);

  const [previewImages, setPreviewImages] = useState();

  const [error, setError] = useState("");

  /*FILTER*/
  const allCountries = [...countries];

  const applyFilters = () => {
    let filteredCountries = allCountries;
    if (destination) {
      filteredCountries = filteredCountries.filter(countries => countries.country.toLowerCase().includes(destination.toLowerCase()));
    }
    destination ? setSearchedDestination(filteredCountries) : setSearchedDestination([]);
  };

  /*SEARCH LOGIC*/
  const debouncedHandleSearch = debounce(value => {
    setShowDestinationDrop("show");
    setDestination(value);
    !value ? setShowDestinationDrop("show") : null;
  }, 50);

  const handleSearch = e => {
    const value = e.target.value;
    debouncedHandleSearch(value);
  };

  //HIDE DESTINATION DROP
  const handleDestinationHide = () => {
    setShowDestinationDrop("");
  };

  //UPLOAD IMAGES BUTTON
  const handleUploadButton = () => {
    uploadRef.current.click();
  };

  //CLEAR LOCAL STORAGE
  const emptyLocalStorage = () => {
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith("userImagePreview")) {
        localStorage.removeItem(key);
      }
    });
  };

  //SUBMIT
  const handleSubmit = async e => {
    e.preventDefault();

    //FINAL TEST FIELDS
    if (!TestFieldsContentReg(name, destination, city, address, rooms, guests, price, description, previewImages, setError)) {
      return;
    }

    setLoading(true);

    //UPLOAD IMAGES
    const images = file ? await handleUpload({ websiteId, accommId, name, file }) : imageUrl;

    try {
      const res = await fetch("/api/content/accommAdd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          websiteId,
          accommId,
          name,
          destination,
          city,
          address,
          rooms,
          guests,
          childrenAllowed,
          price,
          description,
          amenities,
          images: images.photos,
        }),
      });

      if (res.ok) {
        const form = e.target;
        form.reset();
        emptyLocalStorage();
        setOpenAdd(false);
        fetchData();
        setTimeout(() => {
          setProgress(1);
          router.refresh();
        }, 500);
      } else {
        setLoading(false);
        const errorResponse = await res.json();
        console.error("Error in client-side request:", errorResponse);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error in client-side request:", error);
    }
  };

  const handleNextStage = e => {
    e.preventDefault();
    /* setProgress((progress += 1));*/
    if (progress === 1) {
      if (!TestFieldsContentReg(name, destination, city, address, rooms, guests, price, description, true, setError)) {
        return;
      }
      setProgress((progress += 1));
      setStage1Pass(true);
    } else if (progress === 2) {
      setProgress((progress += 1));
    }
  };

  useEffect(() => {
    applyFilters();
  }, [destination]);

  return (
    <div className="p-5 flex">
      <div className="grid place-items-center accommodation-form-position">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 accommodationForm"
        >
          {progress === 1 && (
            <AddContentStage1
              destination={destination}
              setName={setName}
              setError={setError}
              handleSearch={handleSearch}
              setCity={setCity}
              setAddress={setAddress}
              setRooms={setRooms}
              setGuests={setGuests}
              setChildrenAllowed={setChildrenAllowed}
              setPrice={setPrice}
              setDescription={setDescription}
              setStage1Pass={setStage1Pass}
              name={name}
              city={city}
              address={address}
              rooms={rooms}
              guests={guests}
              price={price}
              description={description}
            />
          )}

          {progress === 2 && (
            <AddContentStage2
              amenities={amenities}
              setAmenities={setAmenities}
            />
          )}

          {progress === 3 && (
            <AddContentStage3
              handleUploadButton={handleUploadButton}
              previewImages={previewImages}
            />
          )}

          {error && <div className="bg-red-500 text-white w-auto text-sm py-2 px-3 rounded-md mt-0 text-center">{error}</div>}
          <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            {progress === 3 ? (
              <button className="inline-flex w-full justify-center rounded-md bg-emerald-500 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-600 sm:ml-3 sm:w-auto">
                Add
              </button>
            ) : (
              <button
                className="inline-flex w-full justify-center rounded-md bg-emerald-500 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-600 sm:ml-3 sm:w-auto"
                onClick={e => {
                  handleNextStage(e);
                }}
              >
                Next
              </button>
            )}
            {previewImages && progress === 3 && (
              <button
                className="mt-3 inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:mt-0 sm:ml-3 sm:w-auto"
                onClick={() => {
                  setPreviewImages("");
                  emptyLocalStorage();
                }}
              >
                Remove images
              </button>
            )}
            {progress > 1 && (
              <button
                className="mt-3 inline-flex w-full justify-center rounded-md bg-yellow-400 px-3 py-2 text-sm font-semibold text-white shadow-sm sm:mt-0 sm:ml-3 sm:w-auto"
                onClick={e => {
                  e.preventDefault();
                  setProgress((progress -= 1));
                  setError("");
                }}
              >
                Previous
              </button>
            )}
            <button
              type="button"
              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              onClick={() => {
                setOpenAdd(false);
                setTimeout(() => {
                  emptyLocalStorage();
                  setProgress(1);
                  setStage1Pass(false);
                }, 500);
              }}
              ref={cancelButtonRef}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      <DynamicLoadLocationDropdown
        showDestinationDrop={showDestinationDrop}
        destMenuRef={destMenuRef}
        handleDestinationHide={handleDestinationHide}
        setDestination={setDestination}
        searchedDestination={searchedDestination}
      />

      <DynamicLoadPrepareUpload
        uploadRef={uploadRef}
        setAddImageUrl={setPreviewImages}
        file={file}
        setFile={setFile}
        mutliple={true}
        setError={setError}
      />

      {loading ? <Loading /> : null}
    </div>
  );
}
