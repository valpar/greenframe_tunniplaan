import React, { useState, useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import UserEditModal from "./UserEditModal";
import { Spinner } from "../UI/Spinner";
import { RequestError } from "../UI/RequestError";
import { UsersTabelContent } from "./UsersTabelContent";

const UsersList = (props) => {
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
        <div data-testid='user-edit-modal' className="green-peeper" />
        <button type="button" className="w-full">
          LISA
        </button>
      </div>
      {isLoading && (
        <div>
          <Spinner containerStyle="py-8" />
          <p>Laeb...</p>
        </div>
      )}
      {error && <RequestError reloadHandler={reloadHandler} size="w-11/12" />}
      {!error && (
        <div className="flex flex-col justify-between lg:px-4 py-4 w-full text-left">
          <div className="hidden lg:flex w-full font-bold bg-neutral-200">
            <div className="user-tab-h-d">EESNIMI</div>
            <div className="user-tab-h-d">PERENIMI</div>
            <div className="user-tab-h-d">EMAIL</div>
            <div className="user-tab-h-d">ROLL</div>
            <div className="hidden lg:block px-4 bg-white" />
          </div>
          <UsersTabelContent
            users={users}
            roleOptions={roleOptions}
            editModalHandler={editModalHandler}
            showEditModal={showEditModal}
            editRowIndex={editRowIndex}
            reloadHandler={reloadHandler}
          />
          {showAddModal && (
            <UserEditModal
              editMode={false}
              onChange={reloadHandler}
              onClose={addModalHandler}
              users={users}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default UsersList;
