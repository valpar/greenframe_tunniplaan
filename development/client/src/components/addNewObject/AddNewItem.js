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
import TooltipLarge from "../UI/Tooltip/TooltipLarge";
import content from "../../assets/content/content.json";

axios.defaults.baseURL = config.api.url;

const AddNewItem = (props) => {
  const {
    deleteMessage,
    roomHasActiveLecturers,
    courseHasActiveLecturers,
    lecturerHasActiveLecturers,
    subjectHasActiveLecturers,
    saveMessage,
  } = content.confirmModalMessages;
  const { mandatoryFields } = content.errorMessages;

  const [inputsState, setInputsState] = useState([{}]);
  const [inputsAreValid, setInputsAreValid] = useState([{ inputs: false }]);
  const [validSubmit, setValidSubmit] = useState(true);
  const [responseId, setResponseId] = useState();
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [showUpdateConfirmModal, setShowUpdateConfirmModal] = useState(false);
  const [deleteModalMessage, setDeleteModalMessage] = useState(deleteMessage);

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
      let typeId;
      let responseId = [];
      if (props.modalFor === "rooms") typeId = "roomId";
      if (props.modalFor === "courses") typeId = "courseId";
      if (props.modalFor === "lecturers") typeId = "lecturerId";
      for (let state of inputsState) {
        await axios
          .post(`/${props.modalFor}`, { ...state })
          .then((response) => {
            responseId.push({ [typeId]: response.data.id });
            if (props.modalFor === "subjects")
              props.onNewItem("subjectId", response.data.id);
            setResponseId(response.data.id);
          });
      }
      if (responseId.length > 0 && props.modalFor !== "subjects")
        props.onNewItem(props.modalFor, responseId);
      setShowUpdateConfirmModal(false);
      props.onClose();
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
    if (event.target.name === "delete") {
      let roomBooked = props.scheduled.filter((row) => {
        if (row.rooms !== "") {
          let arr = row.rooms.filter(
            (room) => room.roomId === inputsState[0].id
          );
          return arr.length > 0 ? row : false;
        }
        return false;
      });
      let courseBooked = props.scheduled.filter((row) => {
        if (row.courses !== "") {
          let arr = row.courses.filter(
            (course) => course.courseId === inputsState[0].id
          );
          return arr.length > 0 ? row : false;
        }
        return false;
      });
      let lecturerBooked = props.scheduled.filter((row) => {
        if (row.lecturers !== "") {
          let arr = row.lecturers.filter(
            (lecturer) => lecturer.lecturerId === inputsState[0].id
          );
          return arr.length > 0 ? row : false;
        }
        return false;
      });
      let subjectBooked = props.scheduled.filter((row) => {
        if (row.subject !== "") {
          return row.subject.id === inputsState[0].id ? row : false;
        }
        return false;
      });

      if (props.modalFor === "rooms" && roomBooked.length > 0)
        setDeleteModalMessage(roomHasActiveLecturers);
      if (props.modalFor === "courses" && courseBooked.length > 0)
        setDeleteModalMessage(courseHasActiveLecturers);
      if (props.modalFor === "lecturers" && lecturerBooked.length > 0)
        setDeleteModalMessage(lecturerHasActiveLecturers);
      if (props.modalFor === "subject" && subjectBooked.length > 0)
        setDeleteModalMessage(subjectHasActiveLecturers);
      setShowDeleteConfirmModal(true);
    }

    if (event.target.name !== "delete") {
      const isValid = inputsAreValid.every(
        (isValid) => isValid.inputs === true
      );
      if (!isValid) return setValidSubmit(isValid);
      if (event.target.name === "update") setShowUpdateConfirmModal(true);
      if (event.target.name === "create") setShowUpdateConfirmModal(true);
    }
  };

  const declineHandler = () => {
    setShowDeleteConfirmModal(false);
  };

  const declineUpdateHandler = () => {
    setShowUpdateConfirmModal(false);
  };

  const updateItemHandler = async () => {
    if (props.modalFor === "rooms") {
      await axios
        .patch(`/rooms/${props.editValues[0].roomId}`, inputsState[0])
        .then((response) => console.log(response));
    }
    if (props.modalFor === "courses") {
      await axios
        .patch(`/courses/${props.editValues[0].courseId}`, inputsState[0])
        .then((response) => console.log(response));
    }
    if (props.modalFor === "lecturers") {
      console.log(inputsState[0]);
      await axios
        .patch(`/lecturers/${props.editValues[0].lecturerId}`, inputsState[0])
        .then((response) => console.log(response));
    }
    if (props.modalFor === "subjects") {
      await axios
        .patch(`/subjects/${props.editValues}`, inputsState[0])
        .then((response) => console.log(response));
    }
    props.onClose();
    props.onDelete();
  };

  const deleteItemHandler = async () => {
    if (props.modalFor === "rooms") {
      await axios
        .delete(`/rooms/${props.editValues[0].roomId}`)
        .then((response) => console.log(response));
    }
    if (props.modalFor === "courses") {
      await axios
        .delete(`/courses/${props.editValues[0].courseId}`)
        .then((response) => console.log(response));
    }
    if (props.modalFor === "lecturers") {
      await axios
        .delete(`/lecturers/${props.editValues[0].lecturerId}`)
        .then((response) => console.log(response));
    }
    if (props.modalFor === "subjects") {
      await axios
        .delete(`/subjects/${props.editValues}`)
        .then((response) => console.log(response));
    }
    setDeleteModalMessage("KUSTUTA");
    props.onDelete();
    props.onClose();
  };
  useEffect(() => {
    if (!validSubmit) {
      const timer = setTimeout(() => {
        setValidSubmit(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [validSubmit]);
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
            ? props.modalFor === "lecturers" && !validSubmit
              ? `${classes.btnRow} ${classes.onEdit} ${classes.lecturerPadding}`
              : `${classes.btnRow} ${classes.onEdit}`
            : classes.btnRow
        }
      >
        {showDeleteConfirmModal && (
          <div className={classes.confirmModal}>
            <ConfirmModal
              onDecline={declineHandler}
              onConfirm={deleteItemHandler}
              modalMessage={deleteModalMessage}
              bottomArrow={true}
            />
          </div>
        )}
        {props.editMode && (
          <button
            onClick={confirmModalHandler}
            className={classes.submitButton}
            type="button"
            name="delete"
          >
            KUSTUTA
          </button>
        )}
        {!validSubmit && (
          <div
            className={
              props.editMode
                ? props.modalFor === "lecturers"
                  ? classes.lecturerError
                  : classes.confirmError
                : classes.confirmErrorAdd
            }
          >
            <TooltipLarge message={mandatoryFields} />
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
      <div className={classes.confirmModalRow}>
        {validSubmit && showUpdateConfirmModal && (
          <div
            className={
              props.editMode
                ? classes.confirmModalUpdate
                : classes.confirmModalAdd
            }
          >
            <ConfirmModal
              onDecline={declineUpdateHandler}
              onConfirm={props.editMode ? updateItemHandler : submitItemHandler}
              modalMessage={saveMessage}
              bottomArrow={true}
            />
          </div>
        )}
      </div>
    </Modal>
  );
};

export default AddNewItem;
