"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import FolderSVG from "@/app/styles/icons/FolderSVG";
import ImageSVG from "@/app/styles/icons/ImageSVG";
import Loading from "@/app/loading";

const DeleteItem = dynamic(() => import("@/components/modals/DeleteModal"), {
  ssr: false,
});

const ImagePreview = dynamic(() => import("@/components/imagePreview"), {
  ssr: false,
});

export default function FileManager({ website }) {
  const deleteHeader = "Delete file";
  const deleteMessage =
    "Are you certain you wish to delete this item? Please note that all associated data will be permanently removed, and this action cannot be undone. It is recommended to ensure that any related content has also been deleted beforehand.";
  const [loading, setLoading] = useState(false);
  const [loadingPreview, setLoadingPreview] = useState(false);
  const [currentFilePath, setCurrentFilePath] = useState(website ? `images/websites/${website}` : "images");
  const [nextFilePath, setNextFilePath] = useState("");
  const [previousFilePath, setPreviousFilePath] = useState("");
  const [currentItem, setCurrentItem] = useState("");
  const [image, setImage] = useState("");
  const [top, setTop] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [componentsLoad, setComponentsLoad] = useState(false);

  const fetchList = async filePath => {
    setLoading(true);
    const { listFiles } = await import("@/lib/storage");
    try {
      const data = await listFiles(filePath);
      setNextFilePath(data);
    } catch (error) {
      console.error("Error fetching files:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList(currentFilePath);
  }, [currentFilePath]); // Fetch files when currentFilePath changes

  const handlePathChange = folder => {
    setCurrentFilePath(folder);
    setPreviousFilePath(currentFilePath);
  };

  const handleBackButton = () => {
    setCurrentItem("");
    if (previousFilePath !== "") {
      setCurrentFilePath(previousFilePath);
      const prevPath = previousFilePath.substring(0, previousFilePath.lastIndexOf("/"));
      setPreviousFilePath(prevPath);
    }
  };

  const handleDeleteFiles = async () => {
    setLoading(true);
    const { deleteFiles } = await import("@/lib/storage");
    try {
      await deleteFiles(currentItem);
    } finally {
      setTimeout(() => {
        fetchList(currentFilePath);
      }, 200);
    }
  };

  const showPreview = async item => {
    setTop(window.scrollY);
    setLoadingPreview(true);
    const { listFiles } = await import("@/lib/storage");
    setCurrentItem(item);
    const newItem = await listFiles(item, true);
    setImage(newItem.url);
    document.body.style.overflow = "hidden";
    setLoadingPreview(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setComponentsLoad(true);
    }, 1000);
  }, []);

  return (
    <div className="">
      {website ? null : (
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 ml-5">File Manager</h1>
          </div>
        </header>
      )}
      <main className="file-manager h-fit bg-gray-100 shadow">
        <p className="bg-gray-300 px-20 py-1">{website ? currentFilePath.replace(`images/websites/${website}`, "website-files") : currentFilePath}</p>

        <div className="px-24 py-2">
          {(
            website
              ? currentFilePath !== `images/websites/${website}` && currentFilePath !== `images/websites/${website}/`
              : currentFilePath !== "images" && currentFilePath !== "images/"
          ) ? (
            <button
              className="mb-1 -ml-4 bg-gray-800 text-white px-4 py-0.5 rounded-md hover:bg-gray-700"
              onClick={handleBackButton}
            >
              Back
            </button>
          ) : null}
          {!loading && nextFilePath.prefixes ? (
            <ul>
              {nextFilePath.prefixes.map((folder, index) => (
                <React.Fragment key={folder}>
                  <li>
                    <button
                      className="py-0.5 folders"
                      onClick={() => handlePathChange(folder)}
                    >
                      <FolderSVG />
                      {folder.replace(`${currentFilePath}/`, "")}
                    </button>
                  </li>
                  {index < nextFilePath.prefixes.length - 1 ? <hr className="line-break-ftp" /> : null}
                </React.Fragment>
              ))}
            </ul>
          ) : (
            <Loading />
          )}
          {loadingPreview ? <Loading /> : null}

          {!loading && nextFilePath.items && (
            <ul>
              {nextFilePath.items.map((item, index) => (
                <React.Fragment key={item}>
                  <li className="my-2">
                    <button onClick={() => showPreview(item)}>
                      <ImageSVG />
                      {item.replace(`${currentFilePath}/`, "")}
                    </button>
                    <button
                      className="ml-auto bg-red-600 text-white px-4 py-0.5 rounded-md hover:bg-red-500 fileManagerDelButt"
                      onClick={() => {
                        setCurrentItem(item);
                        setOpenDelete(true);
                      }}
                    >
                      Delete
                    </button>
                  </li>
                  {index < nextFilePath.items.length - 1 ? <hr className="line-break-ftp" /> : null}
                </React.Fragment>
              ))}
            </ul>
          )}
        </div>
      </main>

      {componentsLoad && image && (
        <ImagePreview
          top={top}
          image={image}
          setImage={setImage}
          setOpenDelete={setOpenDelete}
        />
      )}

      {(componentsLoad || openDelete) && (
        <DeleteItem
          openDelete={openDelete}
          setOpenDelete={setOpenDelete}
          objectId={currentItem}
          deleteFunction={handleDeleteFiles}
          setObjectId={setCurrentItem}
          deleteHeader={deleteHeader}
          deleteMessage={deleteMessage}
        />
      )}
    </div>
  );
}
