import { useEffect } from "react";
import { useState } from "react";
import InputWithPlaceholder from "../../UI/Input/InputWithPlaceholder";
import classes from "./NewRoom.module.css";

const NewRoom = (props) => {
  const { onChange, index } = props;
  const [enteredRoomData, setEnteredRoomData] = useState({
    room: "",
  });
  const [errorMessage, setErrorMessages] = useState({
    room: "",
  });

  const inputChangeHandler = (value) => {
    const isRoom = value.name === "room";
    const hasValue = value.value !== "";
    if (isRoom) {
      const roomExists =
        props.roomsData.rooms.filter((e) => e.room === value.value).length > 0;

      roomExists || !hasValue
        ? setErrorMessages((prevState) => {
            return {
              ...prevState,
              room: roomExists ? "RUUM ON OLEMAS" : "KOHUSTUSLIK",
            };
          })
        : setErrorMessages((prevState) => {
            return { ...prevState, room: null };
          });
      setEnteredRoomData((prevState) => {
        return { ...prevState, room: value.value };
      });
    }
  };

  const removeRowHandler = () => {
    props.onRemoveRow(index);
  };

  useEffect(() => {
    if (errorMessage.room === null) {
      onChange(enteredRoomData, index, true);
      return;
    }
    onChange(enteredRoomData, index, false);
  }, [enteredRoomData, errorMessage]);

  return (
    <div className={classes.container}>
      {index === 0 && (
        <h1 className={classes.caption}>{`${
          props.editMode ? "RUUMI MUUTMINE" : "UUE RUUMI LISAMINE"
        }`}</h1>
      )}
      <div className={classes.inputRow}>
        <InputWithPlaceholder
          placeholder="Ruum"
          onChange={inputChangeHandler}
          name={"room"}
          value={props.values.room}
          errorMessage={errorMessage.room}
        />
        {index === 0 && !props.editMode && (
          <i
            onClick={props.onAddNewRow}
            className={`${classes.plusIcon} bi bi-plus`}
          ></i>
        )}
        {index > 0 && (
          <i
            onClick={removeRowHandler}
            className={`${classes.plusIcon} bi bi-x`}
          ></i>
        )}
      </div>
    </div>
  );
};

export default NewRoom;
