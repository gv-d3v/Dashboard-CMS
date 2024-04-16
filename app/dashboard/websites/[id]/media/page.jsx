"use client";
import { GetAccommodations } from "@/app/calls/GetAccommodations";
import Loading from "@/app/loading";
import ImagePreview from "@/components/imagePreview";
import React, { useEffect, useState } from "react";

export default function WebsiteMedia() {
  const [allAccommodations, setAllAccommodations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null);
  const [top, setTop] = useState(null);

  const fetchData = async () => {
    const data = await GetAccommodations();
    setAllAccommodations(data);
    setLoading(false);
  };

  const handleMedia = (image, firebase) => {
    document.body.style.overflow = "hidden"
    setTop(window.scrollY);
    setImage(image);
  };

  useEffect(() => {
    const fetchDataAndSetLoading = async () => {
      await fetchData();
    };
    fetchDataAndSetLoading();
    /*setTimeout(() => {
      setComponentsLoad(true);
    }, 1000);*/
    console.log(allAccommodations);
  }, []);

  return (
    <div className="media-container h-screen">
      {!loading && allAccommodations ? (
        allAccommodations.map((accomm, index) => {
          return (
            <div
              className="shadow"
              key={index + 1}
            >
              <div className="media-h1-container">
                {" "}
                <h1>{accomm.name}</h1>
              </div>
              <div className="media-images-container">
                {accomm.images.map((image, index) => {
                  return (
                    <img
                    className="cursor-pointer"
                      key={index + 1}
                      src={image.downloadURL}
                      alt={`This image is no longer available`}
                      onClick={() => {
                        handleMedia(image.downloadURL, image.firebaseURL);
                      }}
                    />
                  );
                })}
              </div>
              {image ? (
                <ImagePreview
                  top={top}
                  image={image}
                  setImage={setImage}
                />
              ) : null}
            </div>
          );
        })
      ) : (
        <Loading />
      )}
    </div>
  );
}
