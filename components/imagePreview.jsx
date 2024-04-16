import CancelSVG from "@/app/styles/icons/CancelSVG";
import React from "react";

export default function ImagePreview({ top, image, setImage, setOpenDelete }) {
  const closePreview = e => {
    setImage("");
    document.body.style.overflow = "auto";
  };

  return (
    <div
      style={{ top: top }}
      className={`file-manager-preview ${image ? "show" : ""}`}
      onClick={e => {
        closePreview(e);
      }}
    >
      <button
        className="button-close-preview"
        onClick={() => {
          closePreview();
        }}
      >
        <CancelSVG />
      </button>
      {setOpenDelete ? (
        <button
          className="button-delete-preview bg-red-600 text-white px-4 py-0.5 rounded-md hover:bg-red-500"
          onClick={() => {
            setOpenDelete(true);
          }}
        >
          Delete
        </button>
      ) : null}
      <img
        src={image}
        alt="Clicked Image"
      />
    </div>
  );
}
