"use client";

import React from "react";

export default function Profile({ setOpenProfile, cancelButtonRef, profile, fromnavbar, setOpenEdit }) {
  const { name, email, role, images } = profile;
  const joined = new Date(profile.createdAt);
  const currentDate = new Date();
  const difference = currentDate - joined;
  const worked = Math.floor(difference / (1000 * 60 * 60 * 24) + 1);

  return (
    <div className="inline-block p-5 sm:flex md:flex lg:flex user-profile-modal-content">
      <div className="grid place-items-center mb-auto mt-auto ml-auto mr-auto">
        <img
          className="imageUrl rounded-lg mb-10 h-40 w-40 sm:mb-20 md:mb-20 lg:mb-20"
          src={typeof images[0] === "object" ? images[0].downloadURL : images}
          alt="Profile Image"
        />
      </div>

      <div className="grid place-items-center">
        <div className="">
          <div className="flex flex-col gap-3">
            <div className="profile">
              <span>
                <b>Name: </b>
                {name}
              </span>
              <span>
                <b>Email: </b>
                {email}
              </span>
              <span>
                <b>Role: </b>
                {role}
              </span>
              <span>
                <b>Paygrade: </b>Grade 9
              </span>
              <span>
                <b>Joined: </b>
                {joined.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </span>
              <span>
                <b>Employed: </b>
                {`${worked} ${worked === 1 ? "day" : "days"}`}
              </span>
            </div>

            <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              {fromnavbar === true ? (
                <button
                  className="inline-flex w-full justify-center rounded-md bg-yellow-400 px-7 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 sm:ml-3 sm:w-auto"
                  onClick={() => setOpenEdit(true)}
                >
                  Edit
                </button>
              ) : null}
              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                onClick={() => setOpenProfile(false)}
                ref={cancelButtonRef}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
