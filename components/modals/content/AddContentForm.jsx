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

const DynamicLoadLocationDropdown = dynamic(() => import("../../dropdowns/LocationDropdown"), {
  ssr: false,
});
const DynamicLoadPrepareUpload = dynamic(() => import("../../upload/prepareUpload"), {
  ssr: false,
});

export default function AddContentForm({ setOpenAdd, cancelButtonRef, fetchData }) {
  const router = useRouter();
  const { id } = useParams();
  const websiteId = id;
  const accommId = uuidv4();

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  //Search states and refs
  const destMenuRef = useRef(null);
  const searchRef = useRef(null);
  const uploadRef = useRef(null);

  const [name, setName] = useState("");

  const [popupLeft, setPopupLeft] = useState(0);
  const [destination, setDestination] = useState("");
  const [showDestinationDrop, setShowDestinationDrop] = useState("");
  const [searchedDestination, setSearchedDestination] = useState([]);

  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [rooms, setRooms] = useState("");
  const [guests, setGuests] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

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

  //POPUP POSITION
  const handleWindowResize = () => {
    if (searchRef.current) {
      const searchRect = searchRef.current.getBoundingClientRect();
      setPopupLeft(searchRect.left);
    }
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

    //TEST FIELDS
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
          price,
          description,
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

  useEffect(() => {
    applyFilters();
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [destination]);

  return (
    <div className="inline-block p-5 flex">
      <div className="grid place-items-center accommodation-form-position">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 accommodationForm"
        >
          <div className="form-description-position single-input">
            <span className="form-description">Name</span>
            <input
              maxLength={24}
              type="text"
              placeholder="Name of accommodation"
              onChange={e => {
                setName(e.target.value);
                setError("");
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
                  handleSearch(e);
                  setError("");
                }}
                value={destination}
              />
            </div>
            <div className="form-description-position middle">
              <span className="form-description ">City</span>
              <input
                className="input-margin"
                type="text"
                placeholder="City"
                onChange={e => setCity(e.target.value)}
              />
            </div>
            <div className="form-description-position middle">
              <span className="form-description ">Address</span>
              <input
                type="text"
                placeholder="Address"
                onChange={e => setAddress(e.target.value)}
              />
            </div>
          </div>

          <div className="accommodation-field-position">
            <div className="form-description-position middle">
              <span className="form-description">Rooms</span>
              <input
                className="input-margin"
                type="number"
                placeholder="Number of rooms"
                onChange={e => {
                  setRooms(e.target.value);
                  setError("");
                }}
              />
            </div>
            <div className="form-description-position middle">
              <span className="form-description">Guests</span>
              <input
                className="input-margin"
                type="number"
                placeholder="Number of guests"
                onChange={e => {
                  setGuests(e.target.value);
                  setError("");
                }}
              />
            </div>{" "}
            <div className="form-description-position middle">
              <span className="form-description">Price</span>
              <input
                type="number"
                placeholder="Price per day"
                onChange={e => {
                  setPrice(e.target.value);
                  setError("");
                }}
              />
            </div>
          </div>
          <div className="form-description-position single-input">
            <span className="form-description">Description</span>
            <textarea
              type="text"
              placeholder="Short description about your accommodation"
              onChange={e => {
                setDescription(e.target.value);
                setError("");
              }}
            />
          </div>

          <div
            className="add-images"
            onClick={handleUploadButton}
          >
            <div className="added-images">
              {previewImages ? (
                previewImages.map((photo, index) => {
                  return (
                    <div
                      key={index + 1}
                      className="possition-images"
                    >
                      <img
                        src={photo}
                        alt="Add image"
                      />
                    </div>
                  );
                })
              ) : (
                <div className="add-image-cont">
                  <div className="possition-images">
                    <span>Max size of image 2MB</span>
                    <img
                      className="add-image-button"
                      src={`/addImages.png`}
                      alt="Add image"
                    />
                    <span>Upload up to 6 images</span>
                  </div>
                </div>
              )}
            </div>
            {previewImages ? <span className="added-images-num">{`${previewImages.length} / 6`}</span> : null}
          </div>

          {error && <div className="bg-red-500 text-white w-auto text-sm py-2 px-3 rounded-md mt-0 text-center">{error}</div>}
          <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button className="inline-flex w-full justify-center rounded-md bg-emerald-500 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-600 sm:ml-3 sm:w-auto">
              Add
            </button>
            {previewImages ? (
              <button
                className="mt-3 inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:mt-0 sm:ml-3 sm:w-auto"
                onClick={() => {
                  setPreviewImages("");
                  emptyLocalStorage();
                }}
              >
                Remove images
              </button>
            ) : null}
            <button
              type="button"
              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              onClick={() => {
                setOpenAdd(false);
                emptyLocalStorage();
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
        popupLeft={popupLeft}
        searchedDestination={searchedDestination}
      />

      <DynamicLoadPrepareUpload
        uploadRef={uploadRef}
        setAddImageUrl={setPreviewImages}
        file={file}
        setFile={setFile}
        mutliple={true}
      />

      {loading ? <Loading /> : null}
    </div>
  );
}
