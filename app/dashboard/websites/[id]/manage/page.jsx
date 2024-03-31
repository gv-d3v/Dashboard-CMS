"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import dynamic from "next/dynamic";
import Loading from "@/app/loading";
import AddSVG from "@/app/styles/icons/AddSVG";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { GetAccommodations } from "@/app/calls/GetAccommodations";
import SearchBar from "@/components/SearchBar";

const DynamicAddContent = dynamic(() => import("@/components/modals/content/AddContentModal"), {
  ssr: false,
});

const DynamicEditContent = dynamic(() => import("@/components/modals/content/EditContentModal"), {
  ssr: false,
});

const DynamicDeleteContent = dynamic(() => import("@/components/modals/DeleteModal"), {
  ssr: false,
});

export default function Manage() {
  const { id } = useParams();
  const router = useRouter();
  const [accommId, setAccommId] = useState("");

  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [editAccommodation, setEditAccommodation] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [allAccommodations, setAllAccommodations] = useState([]);
  const [filteredAccommodations, setFilteredAccommodations] = useState([]);

  const [componentsLoad, setComponentsLoad] = useState(false);

  //GET ACCOMMODATIONS
  const fetchData = async () => {
    const data = await GetAccommodations();
    setAllAccommodations(data);
    setFilteredAccommodations(data);
    setIsLoading(false);
  };

  //EDIT ACCOMMODATION
  const editAccomm = accommId => {
    allAccommodations.map(accommodation => {
      if (accommodation._id === accommId) {
        setEditAccommodation(accommodation);
        setOpenEdit(true);
      }
    });
  };

  //DELETE ACCOMMODATION
  const deleteAccomm = async () => {
    const _id = accommId;
    try {
      const deleteAccomm = await fetch("/api/content/accommDelete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id,
        }),
      });

      const result = await deleteAccomm.json();

      if (result === true) {
        fetchData();
        setTimeout(() => {
          setAccommId("");
          router.refresh();
        }, 500);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //GET ACCOMMODATIONS ON LOAD
  useEffect(() => {
    const fetchDataAndSetLoading = async () => {
      await fetchData();
    };
    fetchDataAndSetLoading();
    setTimeout(() => {
      setComponentsLoad(true);
    }, 1000);
  }, []);

  return (
    <div>
      <button
        className="add-content"
        onClick={() => setOpenAdd(true)}
      >
        <AddSVG /> <span>Add accommodation</span>
      </button>
      <SearchBar
        setItems={setFilteredAccommodations}
        items={allAccommodations}
        placeholder={"accommodation"}
        classAtt={"search-accommodation"}
      />
      {isLoading === true ? (
        <Loading
          ml={"100px"}
          mt={"100px"}
        />
      ) : filteredAccommodations.length > 0 ? (
        filteredAccommodations.map((accommodation, index) => {
          if (id === accommodation.websiteId) {
            return (
              <li
                key={index}
                className="content-list"
              >
                <img src={accommodation.images ? accommodation.images : "/house.png"}></img>
                <span>{accommodation.name}</span>
                <div className="website-buttons">
                  <button
                    className="py-2 px-7 mr-5 rounded-lg bg-yellow-400 text-sm font-medium text-white buttonShadow"
                    onClick={e => editAccomm(accommodation._id)}
                  >
                    <PencilSquareIcon
                      className="inline-block h-5 w-5 mr-1 pb-1 iconShadow"
                      aria-hidden="true"
                    />
                    <span className="textShadow ">Edit</span>
                  </button>

                  <button
                    className="py-2 px-5 mr-5 rounded-lg bg-red-600 text-sm font-medium text-white buttonShadow mt-2.5 md:mt-0 lg:mt-0"
                    onClick={e => {
                      setOpenDelete(true);
                      setAccommId(accommodation._id);
                    }}
                  >
                    <TrashIcon
                      className="inline-block h-5 w-5 mr-1 pb-1 iconShadow"
                      aria-hidden="true"
                    />
                    <span className="textShadow">Delete</span>
                  </button>
                </div>
              </li>
            );
          }
        })
      ) : (
        <div className="website-list w-full no-results">
          <span>No accommodations match your search criteria</span>
        </div>
      )}

      {(componentsLoad || openAdd) && (
        <DynamicAddContent
          openAdd={openAdd}
          setOpenAdd={setOpenAdd}
          fetchData={fetchData}
        />
      )}

      {(componentsLoad || openEdit) && (
        <DynamicEditContent
          openEdit={openEdit}
          setOpenEdit={setOpenEdit}
          fetchData={fetchData}
          editAccommodation={editAccommodation}
        />
      )}

      {(componentsLoad || openDelete) && (
        <DynamicDeleteContent
          openDelete={openDelete}
          setOpenDelete={setOpenDelete}
          deleteFunction={deleteAccomm}
          setObjectId={setAccommId}
        />
      )}
    </div>
  );
}
