import AddSVG from "@/app/styles/icons/AddSVG";
import React, { useEffect, useState } from "react";
import AddContent from "../modals/AddContent";
import { GetAccommodations } from "@/app/calls/GetAccommodations";
import Loading from "@/app/loading";
import { useParams } from "next/navigation";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import SearchBar from "../SearchBar";

export default function Manage() {
  const { id } = useParams();
  const [openAdd, setOpenAdd] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [allAccommodations, setAllAccommodations] = useState([]);
  const [filteredAccommodations, setFilteredAccommodations] = useState([]);

  //GET ACCOMMODATIONS
  const fetchData = async () => {
    const data = await GetAccommodations();
    setAllAccommodations(data);
    setFilteredAccommodations(data);
    setIsLoading(false);
  };

  //GET ACCOMMODATIONS ON LOAD
  useEffect(() => {
    const fetchDataAndSetLoading = async () => {
      await fetchData();
    };
    fetchDataAndSetLoading();
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
                <img src={accommodation.image ? accommodation.image : "/house.png"}></img>
                <span>{accommodation.name}</span>
                <div className="website-buttons">
                  <button
                    className="py-2 px-7 mr-5 rounded-lg bg-yellow-400 text-sm font-medium text-white buttonShadow"
                    //onClick={() => editUser(person._id)}
                  >
                    <PencilSquareIcon
                      className="inline-block h-5 w-5 mr-1 pb-1 iconShadow"
                      aria-hidden="true"
                    />
                    <span className="textShadow ">Edit</span>
                  </button>

                  <button
                    className="py-2 px-5 mr-5 rounded-lg bg-red-600 text-sm font-medium text-white buttonShadow mt-2.5 md:mt-0 lg:mt-0"
                    /*onClick={e => {
                      setOpenDelete(true);
                      setUserId(person._id);
                    }}*/
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
      <AddContent
        openAdd={openAdd}
        setOpenAdd={setOpenAdd}
        fetchData={fetchData}
      />
    </div>
  );
}
