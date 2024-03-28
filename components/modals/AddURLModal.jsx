"use client";

import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import PrepareUpload from "../prepareUpload";

export default function AddURLModal({ openURLModal, setOpenURLModal, addImageUrl, setAddImageUrl, setImageUrl, file, setFile }) {
  const [url, setUrl] = useState("");
  const uploadRef = useRef(null);
  const cancelButtonRef = useRef(null);

  const handleUploadButton = () => {
    uploadRef.current.click();
  };

  return (
    <Transition.Root
      show={openURLModal}
      as={Fragment}
    >
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpenURLModal}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mr-4 sm:mt-0 sm:text-left w-full">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Add image URL:
                      </Dialog.Title>
                      <div className="mt-2 w-auto">
                        <input
                          className="w-full"
                          type="text"
                          placeholder="Image URL"
                          onChange={e => setUrl(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-emerald-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-600 sm:ml-3 sm:w-auto"
                    onClick={() => {
                      setOpenURLModal(false);
                      if (url !== "") {
                        setTimeout(() => {
                          setImageUrl(url);
                          setAddImageUrl(url);
                        }, 200);
                      }
                    }}
                  >
                    {addImageUrl !== "/user.png" && addImageUrl !== "/addImage.png" ? "Change" : "Add"}
                  </button>
                  {addImageUrl !== "/user.png" && addImageUrl !== "/addImage.png" ? (
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={() => {
                        setOpenURLModal(false);
                        setAddImageUrl("/addImage.png");
                        setImageUrl("/user.png");
                        setFile(null);
                        localStorage.removeItem("userImagePreview");
                      }}
                    >
                      Remove image
                    </button>
                  ) : null}
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setOpenURLModal(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-emerald-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-600 sm:ml-3 sm:w-auto mr-auto"
                    onClick={handleUploadButton}
                  >
                    <PrepareUpload
                      uploadRef={uploadRef}
                      setAddImageUrl={setAddImageUrl}
                      setOpenURLModal={setOpenURLModal}
                      file={file}
                      setFile={setFile}
                    />
                    Upload
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
