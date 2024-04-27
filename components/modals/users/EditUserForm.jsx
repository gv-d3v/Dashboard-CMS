"use client";

import React, { useRef } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AddURLModal from "./AddURLModal";
import { useSession } from "next-auth/react";

import handleUpload from "../../upload/handleUpload";
import Loading from "@/app/loading";
import TestFieldsUserEdit from "@/tools/testFieldsUserEdit";
import { deleteFiles } from "@/lib/storage";

export default function EditForm({ setOpenEdit, cancelButtonRef, fetchData, people, editPerson }) {
  const router = useRouter();
  const { data: session } = useSession();

  const currentUser = session?.user;
  const Administrator = "Administrator";

  const _id = editPerson._id;
  const origEmail = editPerson.email;
  const refForm = useRef(null);

  const userId = editPerson.userId;
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState(editPerson.name);
  const [email, setEmail] = useState(editPerson.email);
  const [changePassword, setChangePassword] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setConfirmPassword] = useState("");
  const [role, setRole] = useState(editPerson.role);
  const [imageUrl, setImageUrl] = useState(editPerson.images);

  const [openURLModal, setOpenURLModal] = useState(false);
  const [addImageUrl, setAddImageUrl] = useState(editPerson.images);

  const [error, setError] = useState("");

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

  //SHOW CHANGE PASSWORD FIELDS
  const handleChangePass = e => {
    e.preventDefault();
    setChangePassword(true);
  };

  //EDIT USER FB
  const editFireUser = () => {
    fetch("/api/fb/fireUsersEdit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: origEmail,
        newEmail: email,
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

  //SUBMIT
  const handleSubmit = async e => {
    e.preventDefault();

    //CHECK IF USER EXISTS
    userExists();

    //TEST FIELDS
    if (!TestFieldsUserEdit(currentUser, name, email, password, passwordConfirm, setError)) {
      return;
    }

    setLoading(true);

    //DELETE PREVIOUS IMAGE FROM STORAGE, THEN UPLOAD NEW ONE
    const handleDeleteAndUpload = async () => {
      const prevFBImage = editPerson.images[0].firebaseURL;
      deleteFiles(prevFBImage);
      return handleUpload({ userId, name, file });
    };

    const images = file ? await handleDeleteAndUpload() : { photos: imageUrl };

    //API CALL - EDIT USER
    const res = await fetch("/api/team/userEdit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id,
        name,
        email,
        password,
        images: images.photos,
        role,
      }),
    });

    if (res.ok) {
      editFireUser();
      refreshAfterEdit();
    } else {
      setLoading(false);
      console.log("User does not exists, but registration failed!");
    }
  };

  const refreshAfterEdit = () => {
    setOpenEdit(false);
    const form = refForm.current;
    fetchData();
    setTimeout(() => {
      form.reset();
      setLoading(false);
      router.refresh();
    }, 500);
  };

  return (
    <div className="inline-block px-5 pb-5 sm:flex md:flex lg:flex formPadding">
      <div className="grid place-items-center addImage my-auto  ml-auto mr-4 w-full">
        <img
          className="imageUrl rounded-lg mb-10 h-40 w-40 sm:mb-20 md:mb-20 lg:mb-20"
          src={addImageUrl[0] !== "/user.png" ? (typeof addImageUrl[0] === "object" ? addImageUrl[0].downloadURL : addImageUrl) : "/addImage.png"}
          alt="Add Image"
          onClick={() => setOpenURLModal(true)}
        />
      </div>

      <div className="grid place-items-center w-72">
        <div className="">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 regForm"
            ref={refForm}
          >
            <input
              type="text"
              placeholder="Full Name"
              disabled={currentUser?.role === Administrator ? false : true}
              onChange={e => {
                setName(e.target.value);
                setError("");
              }}
              value={name}
            />
            <input
              type="text"
              placeholder="Email"
              disabled={currentUser?.role === Administrator ? false : true}
              onChange={e => {
                setEmail(e.target.value.toLowerCase().replace(/\s+$/, ""));
                setError("");
              }}
              value={email}
            />

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
              disabled={email !== currentUser?.email ? false : true}
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

            {changePassword ? (
              <input
                type="password"
                placeholder="New Password"
                onChange={e => {
                  setPassword(e.target.value);
                  setError("");
                }}
              />
            ) : null}

            {changePassword ? (
              <input
                type="password"
                placeholder="Confirm Password"
                onChange={e => {
                  setConfirmPassword(e.target.value);
                  setError("");
                }}
              />
            ) : null}

            {currentUser?.email === origEmail && !changePassword ? (
              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto changePassButt"
                onClick={e => handleChangePass(e)}
              >
                Change password
              </button>
            ) : null}

            {currentUser?.email === origEmail ? null : (
              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto changePassButt"
                ref={cancelButtonRef}
              >
                Reset Password
              </button>
            )}
            {error && <div className="bg-red-500 text-white w-auto text-sm py-2 px-3 rounded-md mt-0 text-center">{error}</div>}
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
