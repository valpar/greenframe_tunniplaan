import Modal from "../UI/Modal/Modal";
import { useEffect, useState } from "react";
import axios from "axios";
import ConfirmModal from "../UI/ConfirmModal/ConfirmModal";
import config from "../../config.json";
import TooltipLarge from "../UI/Tooltip/TooltipLarge";
import content from "../../assets/content/content.json";
import RequestModal from "../UI/RequestModal/RequestModal";
import { InputOverlappingLabel } from "../UI/Input/InputOverlappingLabel";
import DropdownOverlappingInput from "../UI/Dropdown/DropdownOverlappingInput";

axios.defaults.baseURL = config.api.url;

const userObject = {
  firstName: "",
  lastName: "",
  email: "",
  role: "",
};

const UserEditModal = (props) => {
  const { deleteMessage, saveMessage } = content.confirmModalMessages;

  const { mandatoryFields, brokenEmail } = content.errorMessages;

  const { editMode, editValues, users } = props;

  const [validSubmit, setValidSubmit] = useState(true);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [showUpdateConfirmModal, setShowUpdateConfirmModal] = useState(false);
  const [deleteModalMessage, setDeleteModalMessage] = useState(deleteMessage);
  const [showOverlay, setOverlay] = useState(false);

  const [requestError, setRequestError] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState(false);
  const [requestLoading, setRequestLoading] = useState(false);
  const [requestMessage, setRequestMessage] = useState("");
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [hideModal, setHideModal] = useState(false);
  const [requestAction, setRequestAction] = useState("");

  const submitItemHandler = async () => {
    setOverlay(false);

    if (validSubmit) {
      setRequestAction("create");

      try {
        setShowUpdateConfirmModal(false);
        setHideModal(true);
        setShowRequestModal(true);
        setRequestLoading(true);

        for (let data of enteredUserData) {
          await axios.post(`/users`, { ...data }).then((response) => {});
        }
      } catch (error) {
        setRequestLoading(false);
        setRequestError(true);
        setRequestMessage(content.errorMessages.requestAddError);
        return;
      }

      setRequestLoading(false);
      setRequestMessage(content.successMessages.create);
      setRequestSuccess(true);
    }
  };

  const closeHandler = () => {
    props.onClose(props.modalFor);
  };

  const confirmModalHandler = (event) => {
    if (event.target.name === "delete") {
      setShowDeleteConfirmModal(true);
      setOverlay(true);
    }

    if (event.target.name !== "delete") {
      const isValid = errorMessage.every((obj) =>
        Object.values(obj).every((v) => v === "" || v === null)
      );
      const hasValues = enteredUserData.every((obj) =>
        Object.values(obj).every((v) => v?.length > 0)
      );

      if (!hasValues || !isValid) {
        return setValidSubmit(false);
      }
      if (event.target.name === "update") {
        setShowUpdateConfirmModal(true);
      }
      if (event.target.name === "create") {
        setShowUpdateConfirmModal(true);
      }

      setOverlay(true);
    }
  };

  const declineHandler = () => {
    setOverlay(false);
    setShowDeleteConfirmModal(false);
  };

  const declineUpdateHandler = () => {
    setOverlay(false);
    setShowUpdateConfirmModal(false);
  };

  const updateItemHandler = async () => {
    setOverlay(false);
    setRequestAction("update");

    try {
      setShowUpdateConfirmModal(false);
      setOverlay(false);
      setHideModal(true);
      setShowRequestModal(true);
      setRequestLoading(true);

      await axios
        .patch(`/users/${editValues.id}`, enteredUserData[0])
        .then((response) => console.log(response));
    } catch (error) {
      setRequestLoading(false);
      setRequestError(true);
      setRequestMessage(content.errorMessages.requestUpdateError);
      return;
    }

    setRequestLoading(false);
    setRequestMessage(content.successMessages.update);
    setRequestSuccess(true);
  };

  const deleteItemHandler = async () => {
    setRequestAction("delete");
    try {
      setShowDeleteConfirmModal(false);
      setOverlay(false);
      setHideModal(true);
      setShowRequestModal(true);
      setRequestLoading(true);

      await axios
        .delete(`/users/${editValues.id}`)
        .then((response) => console.log(response));
    } catch (error) {
      setRequestLoading(false);
      setRequestError(true);
      setRequestMessage(content.errorMessages.requestDeleteError);
      return;
    }
    setRequestLoading(false);
    setRequestMessage(content.successMessages.delete);
    setRequestSuccess(true);
    setDeleteModalMessage("KUSTUTA");
  };

  useEffect(() => {
    if (!validSubmit) {
      const timer = setTimeout(() => {
        setValidSubmit(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [validSubmit]);

  useEffect(() => {
    if (requestSuccess) {
      const timer = setTimeout(() => {
        props.onChange();
        props.onClose();

        setHideModal(false);
        setShowRequestModal(false);
        setRequestSuccess(false);
        setRequestMessage("");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [requestSuccess]);

  const endRequestHandler = () => {
    props.onClose();
  };
  const failedRequestConfirmHandler = () => {
    setRequestError(false);
    setRequestMessage("");

    if (requestAction === "create") {
      submitItemHandler();
    }
    if (requestAction === "delete") {
      deleteItemHandler();
    }
    if (requestAction === "update") {
      updateItemHandler();
    }
  };

  const [enteredUserData, setEnteredUserData] = useState([
    {
      firstName: "",
      lastName: "",
      email: "",
      role: "",
    },
  ]);
  const [errorMessage, setErrorMessages] = useState([
    {
      firstName: "",
      lastName: "",
      email: "",
      role: "",
    },
  ]);

  const roleOptions = [
    { label: "Admin", value: "admin" },
    { label: "Õpilane", value: "student" },
    { label: "Õppejõud", value: "lecturer" },
  ];

  const addNewRowHandler = () => {
    setEnteredUserData((prevState) => {
      return (prevState = [...prevState, userObject]);
    });
    setErrorMessages((prevState) => {
      return (prevState = [...prevState, userObject]);
    });
  };
  const removeRowHandler = (value) => {
    const index = parseInt(value?.target.getAttribute("index"));

    setEnteredUserData((prevState) => {
      return [...prevState.filter((e, i) => i !== index)];
    });
    setErrorMessages((prevState) => {
      return [...prevState.filter((e, i) => i !== index)];
    });
  };

  useEffect(() => {
    if (editMode) {
      setEnteredUserData([
        {
          firstName: editValues.firstName,
          lastName: editValues.lastName,
          email: editValues.email,
          role: editValues.role,
        },
      ]);
    }
    setErrorMessages([
      {
        firstName: "",
        lastName: "",
        email: "",
        role: "",
      },
    ]);
  }, []);

  const inputChangeHandler = (value) => {
    const isFirstName = value.name === "firstName";
    const isLastName = value.name === "lastName";
    const isEmail = value.name === "email";
    const trimmedValue = value?.value.trim();

    const roleObj = roleOptions.find((item) => {
      return item.label === trimmedValue;
    });
    const roleValue = roleObj ? roleObj.value : "";

    const hasValue = trimmedValue.length > 0;

    if (isFirstName) {
      !hasValue
        ? setErrorMessages((prevState) => {
            const prev = [...prevState];
            prev[value.id] = {
              ...prev[value.id],
              firstName: mandatoryFields,
            };
            return prev;
          })
        : setErrorMessages((prevState) => {
            const prev = [...prevState];
            prev[value.id] = {
              ...prev[value.id],
              firstName: null,
            };
            return prev;
          });
      setEnteredUserData((prevState) => {
        const prev = [...prevState];
        prev[value.id] = {
          ...prev[value.id],
          firstName: trimmedValue,
        };
        return prev;
      });
    }

    if (isLastName) {
      !hasValue
        ? setErrorMessages((prevState) => {
            const prev = [...prevState];
            prev[value.id] = {
              ...prev[value.id],
              lastName: mandatoryFields,
            };
            return prev;
          })
        : setErrorMessages((prevState) => {
            const prev = [...prevState];
            prev[value.id] = {
              ...prev[value.id],
              lastName: null,
            };
            return prev;
          });
      setEnteredUserData((prevState) => {
        const prev = [...prevState];
        prev[value.id] = {
          ...prev[value.id],
          lastName: trimmedValue,
        };
        return prev;
      });
    }

    if (isEmail) {
      const emailExists =
        users.filter((e) => e.email === trimmedValue).length > 0;
      const isEmailVaild = trimmedValue.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      );

      (emailExists && trimmedValue !== editValues.email) ||
      !hasValue ||
      !isEmailVaild
        ? setErrorMessages((prevState) => {
            const prev = [...prevState];
            prev[value.id] = {
              ...prev[value.id],
              email: emailExists
                ? emailExists
                : !isEmailVaild
                ? brokenEmail
                : mandatoryFields,
            };
            return prev;
          })
        : setErrorMessages((prevState) => {
            const prev = [...prevState];
            prev[value.id] = {
              ...prev[value.id],
              email: null,
            };
            return prev;
          });

      setEnteredUserData((prevState) => {
        const prev = [...prevState];
        prev[value.id] = {
          ...prev[value.id],
          email: trimmedValue,
        };
        return prev;
      });
    }

    if (roleValue) {
      if (!roleValue.length > 0) {
        setErrorMessages((prevState) => {
          const prev = [...prevState];
          prev[value.id] = {
            ...prev[value.id],
            role: mandatoryFields,
          };
          return prev;
        });
      } else {
        setErrorMessages((prevState) => {
          const prev = [...prevState];
          prev[value.id] = {
            ...prev[value.id],
            role: null,
          };
          return prev;
        });
      }
      setEnteredUserData((prevState) => {
        const prev = [...prevState];
        prev[value.id] = {
          ...prev[value.id],
          role: roleValue,
        };
        return prev;
      });
    }
  };

  return (
    <Modal
      onCenter={true}
      onHidden={hideModal}
      onClose={closeHandler}
      overlay={showOverlay}
    >
      <div className="relative flex flex-col">
        <div className="relative flex justify-end">
          <i
            onClick={closeHandler}
            className={`bi bi-x-lg absolute text-3xl lg:text-xl -top-2 -right-2`}
          ></i>
        </div>
        <div className="flex flex-col items-center mb-2 lg:min-w-[50rem]">
          <h1 className="font-bold text-lg my-2 mb-6">{`${
            editMode ? "KASUTAJA ANDMETE MUUTMINE" : "UUE KASUTAJA LISAMINE"
          }`}</h1>
          {enteredUserData.map((e, i) => {
            return (
              <div key={i} className="w-full">
                <div className="flex flex-col justify-center lg:flex-row space-x-0 space-y-4 lg:space-y-0 lg:mb-4 lg:space-x-4 w-full">
                  <InputOverlappingLabel
                    placeholder="Eesnimi"
                    onChange={inputChangeHandler}
                    name={"firstName"}
                    value={e.firstName}
                    errorMessage={errorMessage[i]?.firstName}
                    eTopPos="true"
                    index={i}
                  />
                  <InputOverlappingLabel
                    placeholder="Perenimi"
                    onChange={inputChangeHandler}
                    name={"lastName"}
                    value={e.lastName}
                    errorMessage={errorMessage[i]?.lastName}
                    eTopPos="true"
                    index={i}
                  />
                  <InputOverlappingLabel
                    placeholder="Email"
                    onChange={inputChangeHandler}
                    name={"email"}
                    value={e.email}
                    errorMessage={errorMessage[i]?.email}
                    eTopPos="true"
                    index={i}
                  />
                  <DropdownOverlappingInput
                    placeholder="Roll"
                    onChange={inputChangeHandler}
                    name={"role"}
                    value={
                      roleOptions.find((item) => {
                        return item.value === e.role;
                      })?.label
                    }
                    errorMessage={errorMessage[i]?.role}
                    eTopPos="true"
                    options={roleOptions}
                    showOptions="true"
                    readOnly="true"
                    index={i}
                  />
                  <div className={`${!props.editMode ? "w-24" : ""}`}>
                    {!props.editMode && (
                      <div
                        className={`hidden lg:flex justify-end items-center`}
                      >
                        {i === enteredUserData.length - 1 && (
                          <i
                            onClick={addNewRowHandler}
                            className={`bi bi-plus text-4xl`}
                          ></i>
                        )}
                        {enteredUserData.length > 1 && (
                          <div>
                            <i
                              onClick={removeRowHandler}
                              className={`bi bi-x text-4xl`}
                              index={i}
                            ></i>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div
          className={`flex ${
            props.editMode
              ? "justify-between space-x-20"
              : "justify-center lg:justify-between"
          } w-full pt-8`}
        >
          <div className="relative">
            {showDeleteConfirmModal && (
              <div className="absolute top-20 -left-16">
                <ConfirmModal
                  onDecline={declineHandler}
                  onConfirm={deleteItemHandler}
                  modalMessage={deleteModalMessage}
                  topArrow={true}
                />
              </div>
            )}
            {props.editMode && (
              <button
                onClick={confirmModalHandler}
                className="btn-actions"
                type="button"
                name="delete"
              >
                KUSTUTA
              </button>
            )}
          </div>
          <div className="relative">
            {!validSubmit && (
              <div className="absolute -top-16 -left-10 w-[150%]">
                <TooltipLarge message={mandatoryFields} />
              </div>
            )}

            <button
              onClick={confirmModalHandler}
              className="btn-actions"
              type="submit"
              name={props.editMode ? "update" : "create"}
            >
              SALVESTA
            </button>

            {validSubmit && showUpdateConfirmModal && (
              <div className="absolute top-20 -left-16">
                <ConfirmModal
                  onDecline={declineUpdateHandler}
                  onConfirm={
                    props.editMode ? updateItemHandler : submitItemHandler
                  }
                  modalMessage={saveMessage}
                  topArrow={true}
                />
              </div>
            )}
          </div>
        </div>
        {showRequestModal && (
          <RequestModal
            error={requestError}
            success={requestSuccess}
            loading={requestLoading}
            modalMessage={requestMessage}
            customStyle="top-1/2 lg:ml-32"
            onDecline={endRequestHandler}
            onConfirm={failedRequestConfirmHandler}
          />
        )}
      </div>
    </Modal>
  );
};

export default UserEditModal;
