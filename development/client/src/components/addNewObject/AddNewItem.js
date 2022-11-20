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

const baseURL = "http://localhost:4000";

const AddNewItem = (props) => {
  const [inputsState, setInputsState] = useState([{}]);
  const [inputsAreValid, setInputsAreValid] = useState([{ inputs: false }]);
  const [validSubmit, setValidSubmit] = useState(true);
  const [responseId, setResponseId] = useState();
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
          .post(`${baseURL}/${props.modalFor}`, { ...element })
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

      <div className={classes.btnRow}>
        {!validSubmit && <TooltipTop errorMessage={"TÄITMATA VÄLJAD"} />}
        <button
          onClick={submitItemHandler}
          className={classes.submitButton}
          type="submit"
        >
          SALVESTA
        </button>
      </div>
    </Modal>
  );
};

export default AddNewItem;
