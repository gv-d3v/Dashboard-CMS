import Image from "next/image";
import React from "react";

export default function AddContentStage3({ handleUploadButton, previewImages }) {
  return (
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
                <Image
                  width={320}
                  height={190}
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
              <Image
                width={220}
                height={220}
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
  );
}
