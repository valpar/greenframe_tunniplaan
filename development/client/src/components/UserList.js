import React, { useState, useEffect } from "react";
import useAxios from "../hooks/useAxios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import content from "../assets/content/content.json";
import UserEditModal from "./addNewObject/UserEditModal";
import { Spinner } from "./UI/Spinner";

const UserList = (props) => {
  const [users, setUsers] = useState([]);
  const [triggerReload, setTriggerReload] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editRowIndex, setEditRowIndex] = useState();

  const [loginInfo, setLoginInfo] = useState(() => {
    let token = localStorage.getItem("token");
    if (token === {}) {
      return null;
    }

    return token ? JSON.parse(token) : {};
  });

  const { response, isLoading, error } = useAxios(
    {
      method: "get",
      url: `/users`,
      headers: { Authorization: `Bearer ${loginInfo?.token}` },
    },
    triggerReload
  );

  useEffect(() => {
    if (!isLoading && response !== undefined) {
      setUsers(response.users);
    }
  }, [response]);

  useEffect(() => {
    if (error) {
      console.error("Viga kasutajate nimekirja laadimisel", error);
    }
  }, [error]);

  const addModalHandler = () => {
    setShowAddModal((prevState) => (prevState = !prevState));
  };

  const editModalHandler = (value) => {
    setEditRowIndex(parseInt(value?.target.getAttribute("index")));
    setShowEditModal((prevState) => (prevState = !prevState));
  };

  const reloadHandler = () => {
    setTriggerReload((prevState) => (prevState = !prevState));
  };

  const roleOptions = [
    { label: "Admin", value: "admin" },
    { label: "Õpilane", value: "student" },
    { label: "Õppejõud", value: "lecturer" },
  ];

  return (
    <div className="flex flex-col px-4 lg:px-0 lg:justify-center lg:items-center lg:p-2 mt-24 lg:mt-32 lg:border border-borderGray lg:shadow bg-white">
      <div className="flex flex-row justify-between text-s lg:text-lg font-bold w-full">
        <h4 className="lg:ml-8 w-full">KASUTAJATE HALDUS</h4>
        <div className="mr-2">
          <i
            onClick={props.onClose}
            className={`hidden lg:flex bi bi-x-lg top-0 right-2 cursor-pointer text-2xl leading-5 lg:hover:text-black lg:hover:scale-105 duration-150`}
          ></i>
        </div>
      </div>
      <div
        onClick={addModalHandler}
        className="realtive flex justify-between items-center group relative mx-auto mt-4  mb-3 w-48 h-10 font-bold bg-darkGray text-white shadow hover:shadow-lg"
      >
        <div className="green-peeper" />
        <button type="button" className="w-full">
          LISA
        </button>
      </div>
      {isLoading && (
        <div>
          <Spinner containerStyle="py-8" />
          <p>Laeb..</p>
        </div>
      )}
      {error && (
        <div className="p-4 lg:mt-3 border border-borderGray shadow shadow-borderGray w-11/12">
          <div className="flex justify-center py-4 text-4xl lg:text-6xl text-collegeRed">
            <FontAwesomeIcon icon={faExclamation} />
          </div>
          <p className="pb-4">{content.errorMessages.serverError}</p>
          <button
            onClick={reloadHandler}
            className="py-1 px-8 my-4 border border-borderGray shadow hover:bg-borderGray hover:shadow-lg duration-150"
          >
            Uuesti
          </button>
        </div>
      )}
      <div className="flex flex-col justify-between lg:px-4 py-4 w-full text-left">
        <div className="hidden lg:flex w-full font-bold bg-neutral-200">
          <div className="user-tab-h-d">EESNIMI</div>
          <div className="user-tab-h-d">PERENIMI</div>
          <div className="user-tab-h-d">EMAIL</div>
          <div className="user-tab-h-d">ROLL</div>
          <div className="hidden lg:block px-4 bg-white" />
        </div>
        {users.map((e, i) => {
          return (
            <div
              key={i}
              className="flex flex-col lg:flex-row justify-center items-center w-full"
            >
              <div className="group user-tab-row">
                <div className="flex flex-row  w-full">
                  <div className="user-tab-h-m">EESNIMI</div>
                  <div className="w-full py-2 px-4 border border-borderGray">
                    {e.firstName}
                  </div>
                </div>
                <div className="flex flex-row w-full">
                  <div className="user-tab-h-m">PERENIMI</div>
                  <div className="w-full py-2 px-4 border border-borderGray">
                    {e.lastName}
                  </div>
                </div>
                <div className="flex flex-row w-full">
                  <div className="user-tab-h-m">EMAIL</div>
                  <div className="w-full py-2 px-4 border border-borderGray">
                    {e.email}
                  </div>
                </div>
                <div className="flex flex-row w-full">
                  <div className="user-tab-h-m">ROLL</div>
                  <div className="w-full py-2 px-4 border border-borderGray">
                    {
                      roleOptions.find((item) => {
                        return item.value === e.role;
                      })?.label
                    }
                  </div>
                </div>
                <div className="px-4 group-hover:px-2 text-base">
                  <i
                    className="hidden group-hover:lg:block bi bi-pencil-fill cursor-pointer"
                    onClick={editModalHandler}
                    index={i}
                  ></i>
                </div>
                <div className="flex flex-row justify-center w-full lg:hidden mt-4">
                  <button
                    onClick={editModalHandler}
                    index={i}
                    className="btn-actions"
                    type="submit"
                  >
                    MUUDA
                  </button>
                </div>
              </div>
              {showEditModal && editRowIndex === i && (
                <UserEditModal
                  editMode={true}
                  editValues={e}
                  onChange={reloadHandler}
                  onClose={editModalHandler}
                  users={users}
                />
              )}
            </div>
          );
        })}
        {showAddModal && (
          <UserEditModal
            editMode={false}
            onChange={reloadHandler}
            onClose={addModalHandler}
            users={users}
          />
        )}
      </div>
    </div>
  );
};

export default UserList;
