"use client";

import React, { useEffect, useState } from "react";
import { UserPlusIcon, PencilSquareIcon, TrashIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import DeleteModal from "@/components/modals/DeleteModal";
import AddModal from "@/components/modals/AddModal";
import EditModal from "@/components/modals/EditModal";
import { useRouter } from "next/navigation";
import { GetUsers } from "@/app/calls/GetUsers";
import { useSession } from "next-auth/react";
import Loading from "@/app/loading";

let people = [];

export default function Team() {
  const router = useRouter();

  const { data: session } = useSession();

  const [openDelete, setOpenDelete] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState("");
  const [editPerson, setEditPerson] = useState("");

  const refreshData = async () => {
    const data = await GetUsers();

    people = [];
    people.push(...data);
    router.refresh();
  };

  //GET USERS
  const fetchData = async () => {
    const data = await GetUsers();

    people = [];
    people.push(...data);
    setIsLoading(false);
  };

  //GET USERS ON LOAD
  useEffect(() => {
    if (people.length === 0) {
      fetchData();
    }
    if (people.length > 0) {
      setIsLoading(false);
    }
  }, []);

  //EDIT USER
  const editUser = async _id => {
    people.map(person => {
      if (person._id === _id) {
        setEditPerson(person);
        setOpenEdit(true);
      }
    });
  };

  //DELETE USER
  const deleteUser = async () => {
    const _id = userId;

    try {
      const deleteUser = await fetch("../api/userDelete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id,
        }),
      });

      const result = await deleteUser.json();

      if (result === true) {
        fetchData();
        setTimeout(() => {
          setUserId("");
          router.refresh();
        }, 500);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="min-h-full">
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 ">Team</h1>
          </div>
        </header>
        <main>
          <div className="py-0 md:px-20 lg:px-40">
            <ul
              role="list"
              className="divide-y divide-gray-100"
            >
              <li className="flex justify-between gap-x-6 py-5 addButton">
                <div className="flex min-w-0 gap-x-4 ">
                  <button
                    className="bg-blue-500 px-5 py-2 text-sm font-medium text-white rounded-lg buttonShadow"
                    onClick={() => refreshData()}
                  >
                    <ArrowPathIcon
                      className="inline-block h-5 w-5 mr-2 iconShadow"
                      aria-hidden="true"
                    />
                    <span className="textShadow">Refresh</span>
                  </button>
                  <button
                    className="bg-green-500 px-7 py-2 text-sm font-medium text-white rounded-lg buttonShadow"
                    onClick={() => setOpenAdd(true)}
                  >
                    <UserPlusIcon
                      className="inline-block h-6 w-6 mr-2 iconShadow"
                      aria-hidden="true"
                    />
                    <span className="textShadow">Add</span>
                  </button>
                </div>
              </li>
              {isLoading === true ? (
                <Loading />
              ) : (
                people.map((person, index) => (
                  <li
                    key={index}
                    className="flex justify-between gap-x-6 py-5 pl-6 "
                  >
                    <div className="flex min-w-0 gap-x-4 my-auto">
                      <img
                        className={
                          session?.user?.email === person.email
                            ? "h-12 w-12 flex-none rounded-full bg-gray-50 activeBorder"
                            : "h-12 w-12 flex-none rounded-full bg-gray-50"
                        }
                        src={person.imageUrl ? person.imageUrl : "/user.png"}
                        alt={`Image of ${person.name}`}
                      />

                      <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">{person.name}</p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.email}</p>
                      </div>
                    </div>
                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end my-auto">
                      <p className="text-sm leading-6 text-gray-900">{person.role}</p>
                      {person.createdAt ? (
                        <p className="mt-1 text-xs leading-5 text-gray-500">
                          Joined:
                          <time dateTime={` ${person.createdAt}`}>{` ${person.createdAt.split("T")[0]}`}</time>
                        </p>
                      ) : (
                        {
                          /*
                                                <div className='mt-1 flex items-center gap-x-1.5'>
                                                    <div className='flex-none rounded-full bg-emerald-500/20 p-1'>
                                                        <div className='h-1.5 w-1.5 rounded-full bg-emerald-500' />
                                                    </div>
                                                    <p className='text-xs leading-5 text-gray-500'>
                                                        Online
                                                    </p>
                                                    </div>*/
                        }
                      )}
                    </div>
                    <div className="grid md:inline-block lg:inline-block my-auto">
                      <button
                        className="py-2 px-7 mr-5 rounded-lg bg-yellow-400 text-sm font-medium text-white buttonShadow"
                        onClick={() => editUser(person._id)}
                      >
                        <PencilSquareIcon
                          className="inline-block h-5 w-5 mr-1 pb-1 iconShadow"
                          aria-hidden="true"
                        />
                        <span className="textShadow ">Edit</span>
                      </button>
                      {session?.user?.email !== person.email ? (
                        <button
                          className="py-2 px-5 mr-5 rounded-lg bg-red-600 text-sm font-medium text-white buttonShadow mt-2.5 md:mt-0 lg:mt-0"
                          onClick={e => {
                            setOpenDelete(true);
                            setUserId(person._id);
                          }}
                        >
                          <TrashIcon
                            className="inline-block h-5 w-5 mr-1 pb-1 iconShadow"
                            aria-hidden="true"
                          />
                          <span className="textShadow">Delete</span>
                        </button>
                      ) : (
                        <button className="py-2 px-5 mr-5 rounded-lg bg-gray-600 text-sm font-medium text-white buttonShadow mt-2.5 md:mt-0 lg:mt-0">
                          <TrashIcon
                            className="inline-block h-5 w-5 mr-1 pb-1 iconShadow"
                            aria-hidden="true"
                          />
                          <span className="textShadow">Delete</span>
                        </button>
                      )}
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </main>
      </div>
      <DeleteModal
        openDelete={openDelete}
        setOpenDelete={setOpenDelete}
        deleteUser={deleteUser}
        setUserId={setUserId}
      />
      <AddModal
        openAdd={openAdd}
        setOpenAdd={setOpenAdd}
        fetchData={fetchData}
      />
      <EditModal
        openEdit={openEdit}
        setOpenEdit={setOpenEdit}
        editPerson={editPerson}
        people={people}
        fetchData={fetchData}
      />
    </div>
  );
}
