import React, { useState } from "react";
import { prepareImages } from "@/lib/storage"; // Assuming this is the function to handle multiple file uploads
import Loading from "@/app/loading";

export default function UploadImage({ websiteId, accommId, accommName, images, setImages, loading, setLoading, setError, userId, setOpenURLModal }) {
  async function handleImagesUpload(target) {
    const images = target.files; // Get an array of selected files
    if (!images || images.length === 0) {
      return;
    }

    // Check the total number of selected files
    if (images.length > 6) {
      alert("You can only upload up to 6 files.");
      return;
    }

    // Check the size of each file
    for (const image of images) {
      if (image.size > 2 * 1024 * 1024) {
        // 2MB in bytes
        alert(`One or more images exceeds the maximum allowed size of 2MB.`);
        return;
      }
    }

    const imageURLs = await prepareImages(websiteId, accommName, images, accommId, userId); // Send multiple images to storage
    setImages({ ...images, photos: imageURLs });
    setOpenURLModal ? setOpenURLModal(false) : null;
  }

  return (
    <label
      onChange={event => {
        handleImagesUpload(event.target);
        setError ? setError("") : null;
        setLoading(true);
      }}
      htmlFor="upload-image"
      className="add"
    >
      <input
        name=""
        type="file"
        id="upload-image"
        className="file-input hidden w-full h-full"
        size="2MB"
        multiple={websiteId ? true : false}
      />
      {websiteId ? (
        !loading ? (
          images ? (
            images.photos.map((photo, index) => {
              return (
                <div
                  className=""
                  key={index + 1}
                >
                  <img
                    key={index + 1}
                    className="added-images"
                    src={photo}
                    alt="Add image"
                  />
                </div>
              );
            })
          ) : (
            <div>
              <span>Max size of image 2MB</span>
              <img
                className="add-image-button"
                src={`/addImages.png`}
                alt="Add image"
              />
              <span>Upload up to 6 images</span>
            </div>
          )
        ) : (
          <Loading />
        )
      ) : (
        "Upload"
      )}
    </label>
  );
}
