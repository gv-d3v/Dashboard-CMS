"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { UserPlusIcon, PencilSquareIcon, TrashIcon, ArrowPathIcon, UserIcon } from "@heroicons/react/24/outline";
import Loading from "@/app/loading";
import Image from "next/image";

const AddModal = dynamic(() => import("@/components/modals/users/AddUserModal"), {
  ssr: false,
});

const EditModal = dynamic(() => import("@/components/modals/users/EditUserModal"), {
  ssr: false,
});

const DeleteModal = dynamic(() => import("@/components/modals/DeleteModal"), {
  ssr: false,
});

const ProfileModal = dynamic(() => import("@/components/modals/users/UserProfileModal"), {
  ssr: false,
});

export default function Team() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const currentUser = session?.user;
  const Administrator = "Administrator";
  const deleteHeader = "Delete account";
  const deleteMessage = "Are you sure you want to delete this account? All of its data will be permanently removed. This action cannot be undone.";

  const [componentsLoad, setComponentsLoad] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [people, setPeople] = useState([]);
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userFBImages, setUserFBImages] = useState("");

  const [editPerson, setEditPerson] = useState("");

  const [profile, setProfile] = useState("");
  const [openProfile, setOpenProfile] = useState(false);

  //GET USERS
  const fetchData = async () => {
    const { GetUsers } = await import("@/app/calls/GetUsers");
    const data = await GetUsers();
    setPeople(data);
    setIsLoading(false);
  };

  //REFRESH
  const refreshData = async () => {
    fetchData();
    router.refresh();
  };

  //EDIT USER
  const editUser = async _id => {
    people.map(person => {
      if (person._id === _id) {
        setEditPerson(person);
        setOpenEdit(true);
      }
    });
  };

  const handleDeleteButton = person => {
    setOpenDelete(true);
    setUserId(person._id);
    setUserEmail(person.email);
    typeof person.images[0] === "object" ? setUserFBImages(person.images[0].firebaseURL) : null;
  };

  //DELETE USER FB
  const deleteFireUser = email => {
    fetch("/api/fb/fireUsersDelete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
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

  const deleteUserFBImages = async () => {
    const { deleteFiles } = await import("@/lib/storage");
    userFBImages && deleteFiles(userFBImages);
    setUserFBImages("");
  };

  //DELETE USER DB
  const deleteUser = async userId => {
    const _id = userId;

    try {
      const deleteUser = await fetch("/api/team/userDelete", {
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
        deleteFireUser(userEmail);
        userFBImages ? deleteUserFBImages() : null;
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

  const editButton = person => {
    return (
      <button
        className="py-2 px-7 mr-5 rounded-lg bg-yellow-400 text-sm font-medium text-white buttonShadow"
        onClick={() => {
          editUser(person._id);
        }}
      >
        <PencilSquareIcon
          className="inline-block h-5 w-5 mr-1 pb-1 iconShadow"
          aria-hidden="true"
        />
        <span className="textShadow ">Edit</span>
      </button>
    );
  };

  useEffect(() => {
    setTimeout(() => {
      setComponentsLoad(true);
    }, 1000);
  }, []);

  //GET USERS AND SESSION ROLE ON LOAD
  useEffect(() => {
    if (status === "authenticated") {
      fetchData();
    }
  }, [status]); //

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <div>
      <div className="min-h-full">
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 ml-5">Team</h1>
          </div>
        </header>
        <main className="mb-10">
          <div className="py-0 md:px-20 lg:px-40">
            <ul
              role="list"
              className="divide-y divide-gray-100"
            >
              {currentUser?.role === Administrator ? (
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
              ) : null}
              {isLoading === true ? (
                <Loading />
              ) : (
                people.map((person, index) => (
                  <li
                    key={index}
                    className="flex justify-between gap-x-6 py-5 pl-6 "
                  >
                    <div className="flex min-w-0 gap-x-4 my-auto">
                      {typeof person.images[0] === "object" ? (
                        <Image
                          className={
                            currentUser?.email === person.email
                              ? "h-12 w-12 flex-none rounded-full bg-gray-50 activeBorder"
                              : "h-12 w-12 flex-none rounded-full bg-gray-50"
                          }
                          height={48}
                          width={48}
                          src={person.images[0].downloadURL}
                          alt={`Image of ${person.name}`}
                        />
                      ) : (
                        <img
                          className={
                            currentUser?.email === person.email
                              ? "h-12 w-12 flex-none rounded-full bg-gray-50 activeBorder"
                              : "h-12 w-12 flex-none rounded-full bg-gray-50"
                          }
                          src={person.images ? person.images : "/user.png"}
                          alt={`Image of ${person.name}`}
                        />
                      )}

                      <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">{person.name}</p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.email}</p>
                      </div>
                    </div>
                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end my-auto">
                      <p className="text-sm leading-6 text-gray-900">{person.role}</p>

                      <p className="mt-1 text-xs leading-5 text-gray-500">
                        Joined:
                        <time dateTime={` ${person.createdAt}`}>{` ${person.createdAt.split("T")[0]}`}</time>
                      </p>
                    </div>
                    <div className="grid md:inline-block lg:inline-block my-auto">
                      {currentUser?.role === Administrator ? (
                        editButton(person)
                      ) : currentUser?.email === person.email ? (
                        editButton(person)
                      ) : (
                        <button
                          className="py-2 px-5 mr-5 rounded-lg bg-gray-800 hover:bg-gray-600 text-sm font-medium text-white buttonShadow"
                          onClick={() => {
                            setOpenProfile(true);
                            setProfile(person);
                          }}
                        >
                          <UserIcon
                            className="inline-block h-5 w-5 mr-0.5 pb-1 iconShadow"
                            aria-hidden="true"
                          />
                          <span className="textShadow ">Profile</span>
                        </button>
                      )}
                      {currentUser?.role === Administrator ? (
                        currentUser?.email !== person.email ? (
                          <button
                            className="py-2 px-5 mr-5 rounded-lg bg-red-600 text-sm font-medium text-white buttonShadow mt-2.5 md:mt-0 lg:mt-0"
                            onClick={() => {
                              handleDeleteButton(person);
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
                        )
                      ) : null}
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </main>
      </div>

      {(componentsLoad || openAdd) && (
        <AddModal
          openAdd={openAdd}
          setOpenAdd={setOpenAdd}
          fetchData={fetchData}
        />
      )}
      {(componentsLoad || openEdit) && (
        <EditModal
          openEdit={openEdit}
          setOpenEdit={setOpenEdit}
          editPerson={editPerson}
          people={people}
          fetchData={fetchData}
        />
      )}
      {(componentsLoad || openDelete) && (
        <DeleteModal
          openDelete={openDelete}
          setOpenDelete={setOpenDelete}
          objectId={userId}
          deleteFunction={deleteUser}
          setObjectId={setUserId}
          deleteHeader={deleteHeader}
          deleteMessage={deleteMessage}
        />
      )}
      {(componentsLoad || openProfile) && (
        <ProfileModal
          openProfile={openProfile}
          setOpenProfile={setOpenProfile}
          profile={profile}
        />
      )}
    </div>
  );
}
