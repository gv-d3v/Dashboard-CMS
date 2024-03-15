"use client";

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AddURLModal from "./modals/AddURLModal";
import { validateEmail } from "./tools/validateEmail";
import { validatePassword } from "./tools/validatePassword";
import RegisterTestFields from "./tools/registerTestFields";

export default function RegisterForm({ setOpenAdd, cancelButtonRef, fetchData }) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [imageUrl, setImageUrl] = useState("/user.png");
  const [addImageUrl, setAddImageUrl] = useState("/addImage.png");
  const [openURL, setOpenURL] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();

    //TEST FIELDS
    if (!RegisterTestFields(name, email, role, validateEmail, validatePassword, password, passwordConfirm, setError)) {
      return;
    }

    //CHECK IF USER EXISTS
    try {
      const resUserExists = await fetch("../api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        setError("Email is already in use for another user");
        return;
      }

      //REGISTER API
      const res = await fetch("../api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          imageUrl,
          role,
        }),
      });
      if (res.ok) {
        const form = e.target;
        form.reset();
        setOpenAdd(false);
        fetchData();
        setTimeout(() => {
          router.refresh();
        }, 500);
      } else {
        console.log("User does not exists, but registration failed!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="inline-block px-5 pb-5 sm:flex md:flex lg:flex">
      <div className="grid place-items-center addImage my-auto ml-auto mr-4 w-full">
        <img
          className="imageUrl rounded-lg mb-10 h-40 w-40 sm:mb-20 md:mb-20 lg:mb-20"
          src={addImageUrl}
          alt="Add Image"
          onClick={() => setOpenURL(true)}
        />
      </div>

      <div className="grid place-items-center w-72">
        <div className="">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 regForm"
          >
            <input
              type="text"
              placeholder="Full Name"
              onChange={e => {
                setName(e.target.value);
                setError("");
              }}
            />
            <input
              type="text"
              placeholder="Email"
              onChange={e => {
                setEmail(e.target.value.toLowerCase().replace(/\s+$/, ""));
                setError("");
              }}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={e => {
                setPassword(e.target.value);
                setError("");
              }}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              onChange={e => {
                setConfirmPassword(e.target.value);
                setError("");
              }}
            />

            <select
              id="role"
              name="role"
              type="text"
              placeholder="role"
              className="formSelect"
              defaultValue="Choose Role"
              onChange={e => {
                setRole(e.target.value);
              }}
            >
              <option
                value="Choose Role"
                disabled
                className="defaultOption"
              >
                Choose Role
              </option>
              <option
                value={"Administrator"}
                className="otherOptions"
              >
                Administrator
              </option>
              <option
                value={"Pomocni radnik"}
                className="otherOptions"
              >
                Pomocni radnik
              </option>
            </select>

            {error && <div className="bg-red-500 text-white w-auto text-sm py-2 px-3 rounded-md mt-0 text-center">{error}</div>}
            <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button className="inline-flex w-full justify-center rounded-md bg-emerald-500 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-600 sm:ml-3 sm:w-auto">
                Add
              </button>
              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                onClick={() => setOpenAdd(false)}
                ref={cancelButtonRef}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      <AddURLModal
        openURL={openURL}
        setOpenURL={setOpenURL}
        setAddImageUrl={setAddImageUrl}
        setImageUrl={setImageUrl}
      />
    </div>
  );
}
