"use client";
import { GetAccommodations } from "@/app/calls/GetAccommodations";
import Loading from "@/app/loading";
import ImagePreview from "@/components/imagePreview";
import InfiniteScroll from "@/tools/infiniteScroll";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function WebsiteMedia() {
  const [allAccommodations, setAllAccommodations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null);
  const [top, setTop] = useState(null);

  const [itemsShown, setItemsShown] = useState(3);
  const [accLength, setAccLength] = useState(0);

  const fetchData = async () => {
    const data = await GetAccommodations();
    setAllAccommodations(data);
    setLoading(false);
  };

  const handleMedia = (image, firebase) => {
    document.body.style.overflow = "hidden";
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
    allAccommodations;
  }, []);

  return (
    <div className="media-container h-screen">
      {!loading &&
        allAccommodations &&
        allAccommodations.slice(0, itemsShown).map((accomm, outerIndex) => {
          {
            !accLength && setAccLength(allAccommodations.length);
          }
          return (
            <div
              className="shadow"
              key={outerIndex + 1}
            >
              <div className="media-h1-container">
                {" "}
                <h1>{accomm.name}</h1>
              </div>
              <div className="media-images-container">
                {accomm.images.map((image, innerIndex) => {
                  return (
                    <Image
                      width={330}
                      height={200}
                      priority={outerIndex + 1 <= 4 ? true : false}
                      className="cursor-pointer"
                      key={innerIndex + 1}
                      src={image.downloadURL}
                      alt={`This image is no longer available`}
                      onClick={e => {
                        handleMedia(e.target.src);
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
        })}
      <InfiniteScroll
        setItemsShown={setItemsShown}
        itemsShown={itemsShown}
        listLength={accLength}
        itemsIncrement={3}
      />
    </div>
  );
}
