"use client";

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AddURLModal from "./modals/AddURLModal";
import { useSession } from "next-auth/react";
import { validateEmail } from "./tools/validateEmail";
import { validatePassword } from "./tools/validatePassword";
import { EditTestFields } from "./tools/editTestFields";

export default function EditForm({ setOpenEdit, cancelButtonRef, editPerson, people, fetchData }) {
  const _id = editPerson._id;
  const origEmail = editPerson.email;

  const [name, setName] = useState(editPerson.name);
  const [email, setEmail] = useState(editPerson.email);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setConfirmPassword] = useState("");
  const [role, setRole] = useState(editPerson.role);

  const [imageUrl, setImageUrl] = useState(editPerson.imageUrl);
  const [openURL, setOpenURL] = useState(false);
  const [addImage, setAddImage] = useState(editPerson.imageUrl ? editPerson.imageUrl : "/addImage.png");

  const [error, setError] = useState("");

  const { data: session } = useSession();
  const currentUser = session?.user;

  const router = useRouter();

  //REMOVE CURRENT USER FROM CHECKING LIST
  const userExists = async () => {
    let [...peopleEdit] = await people;

    peopleEdit.map(e => {
      if (e.email === origEmail) {
        const index = peopleEdit.indexOf(e);
        peopleEdit.splice(index, 1);
      }
    });

    //CHECK IF USER EXISTS
    peopleEdit.map(e => {
      if (e.email === email) {
        setError("Email is already in use for another user");
        return;
      }
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    //CHECK IF USER EXISTS
    userExists();

    //TEST FIELDS
    if (!EditTestFields(setError, validateEmail, validatePassword, currentUser, name, email, password, passwordConfirm)) {
      return;
    }

    //API EDIT
    const res = await fetch("../api/userEdit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id,
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
      setOpenEdit(false);
      fetchData();
      setTimeout(() => {
        router.refresh();
      }, 500);
    } else {
      console.log("User does not exists, but registration failed!");
    }
  };

  return (
    <div className="inline-block p-5 sm:flex md:flex lg:flex">
      <div className="grid place-items-center addImage mb-auto mt-auto ml-auto mr-auto">
        <img
          className="imageUrl rounded-lg mb-10 h-40 w-40 sm:mb-20 md:mb-20 lg:mb-20"
          src={addImage}
          alt="Add Image"
          onClick={() => setOpenURL(true)}
        />
      </div>

      <div className="grid place-items-center">
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
              value={name}
            />
            <input
              type="text"
              placeholder="Email"
              onChange={e => {
                setEmail(e.target.value.toLowerCase().replace(/\s+$/, ""));
                setError("");
              }}
              value={email}
            />

            {currentUser?.email === origEmail ? (
              <input
                type="password"
                placeholder="Password"
                onChange={e => {
                  setPassword(e.target.value);
                  setError("");
                }}
              />
            ) : null}

            {currentUser?.email === origEmail ? (
              <input
                type="password"
                placeholder="Confirm Password"
                onChange={e => {
                  setConfirmPassword(e.target.value);
                  setError("");
                }}
              />
            ) : null}

            <select
              id="role"
              name="role"
              type="text"
              placeholder="role"
              className="formSelect"
              defaultValue={role}
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
            {currentUser?.email === origEmail ? null : (
              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                ref={cancelButtonRef}
              >
                Reset Password
              </button>
            )}
            {error && ( 
              <div className="bg-red-500 text-white w-auto text-sm py-2 px-3 rounded-md mt-0 text-center">{error}</div>
            )}
            <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button className="inline-flex w-full justify-center rounded-md bg-yellow-400 px-7 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 sm:ml-3 sm:w-auto">
                Edit
              </button>
              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                onClick={() => setOpenEdit(false)}
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
        setAddImage={setAddImage}
      />
    </div>
  );
}
