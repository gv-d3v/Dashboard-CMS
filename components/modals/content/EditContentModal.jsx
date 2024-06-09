"use client";

import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import EditContentForm from "./EditContentForm";
import ProjectTracker from "@/tools/projectTracker";

export default function EditContentModal({ openEdit, setOpenEdit, fetchData, editAccommodation }) {
  const cancelButtonRef = useRef(null);
  const [progress, setProgress] = useState(1);
  const [stage1pass, setStage1Pass] = useState(false);

  return (
    <Transition.Root
      show={openEdit}
      as={Fragment}
      className="z-20"
    >
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpenEdit}
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

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto modal-position">
          <div className="flex items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all accommodation-modal">
                <div className="bg-white px-4 pb-2 pt-5 sm:p-6 sm:pb-2 modal-min-width">
                  <div className="sm:flex sm:items-start">
                    <div
                      className="mt-3 text-center 
                    sm:mx-auto lg:ml-4 sm:mt-0 sm:text-center"
                    >
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Edit accommodation
                      </Dialog.Title>
                    </div>
                  </div>
                </div>
                <ProjectTracker
                  progress={progress}
                  setProgress={setProgress}
                  stage1pass={stage1pass}
                  edit={true}
                />
                <EditContentForm
                  setOpenEdit={setOpenEdit}
                  cancelButtonRef={cancelButtonRef}
                  fetchData={fetchData}
                  editAccommodation={editAccommodation}
                  progress={progress}
                  setProgress={setProgress}
                  setStage1Pass={setStage1Pass}
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
