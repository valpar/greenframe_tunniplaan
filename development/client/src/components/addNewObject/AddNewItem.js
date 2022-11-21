import Modal from "../UI/Modal/Modal";
import NewSubject from "./inputRows/NewSubject";
import classes from "./AddNewItem.module.css";
import { useEffect, useState } from "react";
import TooltipTop from "../UI/Tooltip/TooltipTop";
import { formatMilliseconds } from "../../utils/Format/Date";
import axios from "axios";
import NewLecturer from "./inputRows/NewLecturer";
import NewRoom from "./inputRows/NewRoom";
import NewCourse from "./inputRows/NewCourse";
import ConfirmModal from "../UI/ConfirmModal/ConfirmModal";
import config from "../../config.json";

axios.defaults.baseURL = config.api.url;

const AddNewItem = (props) => {
  const [inputsState, setInputsState] = useState([{}]);
  const [inputsAreValid, setInputsAreValid] = useState([{ inputs: false }]);
  const [validSubmit, setValidSubmit] = useState(true);
  const [responseId, setResponseId] = useState();
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [showUpdateConfirmModal, setShowUpdateConfirmModal] = useState(false);

  console.log(props.editValues);
  console.log(props.modalFor);
  useEffect(() => {
    if (props.modalFor === "rooms") {
      setInputsState(
        props.roomsData.rooms.filter((e) => {
          let arr = props.editValues.filter((room) => room.roomId === e.id);
          console.log(arr);
          return arr.length !== 0 ? { room: e.room } : false;
        })
      );
    }
  }, []);

  const inputsChangeHandler = (inputsObj, rowIndex, validInputs) => {
    setInputsState((prevState) =>
      prevState.map((obj, i) => {
        if (i === rowIndex) return { ...inputsObj };
        return obj;
      })
    );
    setInputsAreValid((prevState) =>
      prevState.map((obj, i) => {
        if (i === rowIndex) return { inputs: validInputs };
        return obj;
      })
    );
  };
  useEffect(() => {
    if (!validSubmit)
      setValidSubmit(
        inputsAreValid.every((isValid) => isValid.inputs === true)
      );
  }, [inputsAreValid, validSubmit]);
  const addNewRowHandler = () => {
    setInputsState((prevState) => {
      return (prevState = [...prevState, {}]);
    });
    setInputsAreValid((prevState) => {
      return (prevState = [...prevState, {}]);
    });
  };
  const removeRowHandler = (index) => {
    setInputsState((prevState) => {
      return [...prevState.filter((e, i) => i !== index)];
    });
    setInputsAreValid((prevState) => {
      return [...prevState.filter((e, i) => i !== index)];
    });
  };

  const submitItemHandler = async () => {
    const isValid = inputsAreValid.every((isValid) => isValid.inputs === true);
    setValidSubmit(isValid);
    if (isValid) {
      inputsState.forEach(async (element) => {
        await axios
          .post(`/${props.modalFor}`, { ...element })
          .then((response) => {
            props.onNewItem(
              props.modalFor === "subjects" ? "subjectId" : props.modalFor,
              response.data.id
            );
            setResponseId(response.data.id);
          });
      });
      setInputsState([{}]);
      setInputsAreValid([{}]);
    }
  };

  const closeHandler = () => {
    if (props.modalFor === "subjects" && responseId) return props.onClose();
    if (responseId) return props.onClose();
    if (props.modalFor === "subjects") return props.onClose("subjectId");
    props.onClose(props.modalFor);
  };
  const confirmModalHandler = (event) => {
    if (event.target.name === "delete") setShowDeleteConfirmModal(true);
    if (event.target.name === "update") setShowUpdateConfirmModal(true);
  };

  const declineHandler = () => {
    setShowDeleteConfirmModal(false);
  };

  const declineUpdateHandler = () => {
    setShowUpdateConfirmModal(false);
  };

  const updateItemHandler = () => {};

  const deleteItemHandler = async () => {
    if (props.modalFor === "rooms") {
      await axios
        .delete(`/rooms/${props.editValues[0].roomId}`)
        .then((response) => console.log(response));
    }
    props.onClose();
    props.onDelete();
  };
  return (
    <Modal onClose={closeHandler}>
      <div className={classes.closeRow}>
        <i onClick={closeHandler} className={`bi bi-x`}></i>
      </div>
      {props.modalFor === "subjects" &&
        inputsState.map((inputsRow, i) => {
          return (
            <div key={i}>
              <NewSubject
                editValues={props.editValues}
                editMode={props.editMode}
                onAddNewRow={addNewRowHandler}
                onRemoveRow={removeRowHandler}
                modalFor={props.modalFor}
                onChange={inputsChangeHandler}
                index={i}
                subjectsData={props.subjectsData}
                values={inputsState[i]}
              />
            </div>
          );
        })}
      {props.modalFor === "lecturers" &&
        inputsState.map((inputsRow, i) => {
          return (
            <div key={i}>
              <NewLecturer
                editValues={props.editValues}
                editMode={props.editMode}
                onAddNewRow={addNewRowHandler}
                onRemoveRow={removeRowHandler}
                modalFor={props.modalFor}
                onChange={inputsChangeHandler}
                index={i}
                lecturerData={props.lecturerData}
                values={inputsState[i]}
              />
            </div>
          );
        })}
      {props.modalFor === "courses" &&
        inputsState.map((inputsRow, i) => {
          return (
            <div key={i}>
              <NewCourse
                editValues={props.editValues}
                editMode={props.editMode}
                onAddNewRow={addNewRowHandler}
                onRemoveRow={removeRowHandler}
                modalFor={props.modalFor}
                onChange={inputsChangeHandler}
                index={i}
                courseData={props.courseData}
                values={inputsState[i]}
              />
            </div>
          );
        })}
      {props.modalFor === "rooms" &&
        inputsState.map((inputsRow, i) => {
          return (
            <div key={i}>
              <NewRoom
                editValues={props.editValues}
                editMode={props.editMode}
                onAddNewRow={addNewRowHandler}
                onRemoveRow={removeRowHandler}
                modalFor={props.modalFor}
                onChange={inputsChangeHandler}
                index={i}
                roomsData={props.roomsData}
                values={inputsState[i]}
              />
            </div>
          );
        })}

      <div
        className={
          props.editMode
            ? `${classes.btnRow} ${classes.onEdit}`
            : classes.btnRow
        }
      >
        {showDeleteConfirmModal && (
          <div className={classes.confirmModal}>
            <ConfirmModal
              onDecline={declineHandler}
              onConfirm={deleteItemHandler}
              modalMessage="KUSTUTA"
              bottomArrow={true}
            />
          </div>
        )}

        <button
          onClick={confirmModalHandler}
          className={classes.submitButton}
          type="button"
          name="delete"
        >
          KUSTUTA
        </button>
        {!validSubmit && <TooltipTop errorMessage={"TÄITMATA VÄLJAD"} />}
        {validSubmit && showUpdateConfirmModal && (
          <div className={classes.confirmModalUpdate}>
            <ConfirmModal
              onDecline={declineUpdateHandler}
              onConfirm={props.editMode ? updateItemHandler : submitItemHandler}
              modalMessage="KINNITA"
              bottomArrow={true}
            />
          </div>
        )}
        <button
          onClick={confirmModalHandler}
          className={classes.submitButton}
          type="submit"
          name={props.editMode ? "update" : "create"}
        >
          SALVESTA
        </button>
      </div>
    </Modal>
  );
};

export default AddNewItem;
