"use client";

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import TestFieldsUserReg from "../../../tools/testFieldsUserReg";
import { v4 as uuidv4 } from "uuid";
import handleUpload from "../../upload/handleUpload";
import dynamic from "next/dynamic";
import Loading from "@/app/loading";

const DynamicAddURLModal = dynamic(() => import("./AddURLModal"), {
  ssr: false,
});

export default function RegisterForm({ setOpenAdd, cancelButtonRef, fetchData }) {
  const [file, setFile] = useState(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const userId = uuidv4(); // nesto uraditi  sa ovim
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");

  const [openURLModal, setOpenURLModal] = useState(false);
  const [imageUrl, setImageUrl] = useState("/user.png");
  const [addImageUrl, setAddImageUrl] = useState("/addImage.png");

  const [error, setError] = useState("");

  //ADD USER FB
  const addFireUser = () => {
    fetch("/api/fb/fireUsersAdd", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })

      .catch(error => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    //TEST FIELDS
    if (!TestFieldsUserReg(name, email, role, password, passwordConfirm, setError)) {
      return;
    }

    setLoading(true);

    //CHECK IF USER EXISTS
    try {
      const resUserExists = await fetch("/api/team/userExists", {
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
        setLoading(false);
        setError("Email is already in use for another user");
        return;
      }

      //UPLOAD IMAGES
      const images = file ? await handleUpload({ userId, name, file }) : imageUrl;

      //REGISTER API
      const res = await fetch("/api/team/userAdd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          name,
          email,
          password,
          images,
          role,
        }),
      });
      if (res.ok) {
        const form = e.target;
        setOpenAdd(false);
        addFireUser();
        fetchData();
        setTimeout(() => {
          form.reset();
          localStorage.removeItem("userImagePreview");
          router.refresh();
        }, 500);
      } else {
        setLoading(false);
        console.log("User does not exists, but registration failed!");
      }
    } catch (error) {
      setLoading(false);
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
          onClick={() => setOpenURLModal(true)}
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

      <DynamicAddURLModal
        openURLModal={openURLModal}
        setOpenURLModal={setOpenURLModal}
        addImageUrl={addImageUrl}
        setAddImageUrl={setAddImageUrl}
        setImageUrl={setImageUrl}
        file={file}
        setFile={setFile}
      />

      {loading ? <Loading /> : null}
    </div>
  );
}
