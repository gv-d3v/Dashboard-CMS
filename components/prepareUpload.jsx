import React, { useEffect } from "react";

export default function PrepareUpload({ uploadRef, setAddImageUrl, setOpenURLModal, file, setFile, mutliple }) {
  useEffect(() => {
    if (file && !mutliple) {
      // Preview the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setAddImageUrl(reader.result);
      };
      reader.readAsDataURL(file[0]);

      // Store the image temporarily in local storage 
      localStorage.setItem("userImagePreview", reader.result);

    } else if (file && mutliple) {
      // Multiple image upload
      const urls = [];
      Object.keys(file).forEach(fileName => {
        const imageFile = file[fileName];
        const reader = new FileReader();
        reader.onloadend = () => {
          // Store the images temporarily in local storage
          localStorage.setItem(`userImagePreview_${fileName}`, reader.result);
          urls.push(reader.result);
          if (urls.length === Object.keys(file).length) {
            setAddImageUrl(urls);
          }
        };
        reader.readAsDataURL(imageFile);
      });
    }
  }, [file, setAddImageUrl, setOpenURLModal]);

  const handlePrepareUpload = event => {
    setFile(event.target.files);
    setOpenURLModal ? setOpenURLModal(false) : null;
  };

  return (
    <input
      onChange={handlePrepareUpload}
      ref={uploadRef}
      accept="image/*"
      name=""
      type="file"
      id="upload-image"
      className="file-input hidden w-full h-full"
      size="2MB"
      multiple={mutliple}
    />
  );
}
