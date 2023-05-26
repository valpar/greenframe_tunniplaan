import { useEffect } from "react";
import { useState } from "react";
import { InputOverlappingLabel } from "../../UI/Input/InputOverlappingLabel";
import content from "../../../assets/content/content.json";

const NewRoom = (props) => {
  const { onChange, index } = props;
  const [enteredRoomData, setEnteredRoomData] = useState({
    room: "",
  });
  const [errorMessage, setErrorMessages] = useState({
    room: "",
  });

  const { roomExists, mandatoryField } = content.errorMessages;

  useEffect(() => {
    if (props.editMode) {
      setEnteredRoomData(
        props.roomsData.rooms.filter((e) => {
          return e.id === props.editValues ? { room: e.room } : false;
        })[0]
      );
    }
    setErrorMessages({ room: null });
  }, []);
  const inputChangeHandler = (value) => {
    const isRoom = value.name === "room";
    const hasValue = value.value !== "";
    if (isRoom) {
      const roomExists =
        props.roomsData.rooms.filter((e) => e.room === value.value).length > 0;

      (roomExists || !hasValue) && !props.editMode
        ? setErrorMessages((prevState) => {
            return {
              ...prevState,
              room: roomExists ? roomExists : mandatoryField,
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
    <div className="flex flex-col items-center mb-2">
      {index === 0 && (
        <h1 className="font-bold text-lg my-4">{`${
          props.editMode ? "RUUMI MUUTMINE" : "UUE RUUMI LISAMINE"
        }`}</h1>
      )}
      <div className="flex flex-col lg:flex-row justify-center space-x-0 space-y-4 lg:space-y-0 lg:space-x-4 w-full">
        <InputOverlappingLabel
          placeholder="Ruum"
          onChange={inputChangeHandler}
          name={"room"}
          value={props.values.room}
          errorMessage={errorMessage.room}
        />
        {!props.editMode && (
          <div className={`hidden lg:flex justify-end items-center w-16`}>
            {index === props.count - 1 && (
              <i
                onClick={props.onAddNewRow}
                className={`bi bi-plus text-4xl`}
              ></i>
            )}
            {props.count > 1 && (
              <div>
                <i
                  onClick={removeRowHandler}
                  className={`bi bi-x text-4xl`}
                ></i>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewRoom;
