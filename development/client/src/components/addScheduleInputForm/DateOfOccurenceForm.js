import classes from "./DateOfOccurenceForm.module.css";
import {
  formatDate,
  formatHoursMinutes,
  formatMilliseconds,
} from "../../utils/Format/Date";
import InputWithLabel from "../UI/Input/InputWithLabel";
import { useEffect, useState } from "react";
import DropdownInput from "../UI/Dropdown/DropdownInput";
import CalendarOneInput from "../UI/Calendar/CalendarOneInput";
import content from "../../assets/content/content.json";

const loadCalculator = (load, startTime) => {
  const minutes = [45, 90, 150, 195, 300, 345, 405, 450, 510, 555, 615, 660];
  const splittedStartTime = startTime.split(":");
  const minutesTotal =
    splittedStartTime[0] * 60 +
    parseInt(splittedStartTime[1]) +
    minutes[load - 1];
  const pad = (input, hour) => {
    if (hour && input === 24) return "00";
    if (hour && input > 24)
      return input - 24 < 10 ? "0" + (input - 24) : input - 24;
    return input < 10 ? "0" + input : input;
  };
  return `${pad(Math.floor(minutesTotal / 60), "hour")}:${pad(
    Math.floor(minutesTotal % 60)
  )}`;
};

const beginValues = [
  {
    label: "10:00",
    value: "10:00",
  },
  {
    label: "14:15",
    value: "14:15",
  },
  {
    label: "17:30",
    value: "17:30",
  },
  {
    label: "18:00",
    value: "18:00",
  },
];
const endValues = [
  {
    label: "13:15",
    value: "13:15",
  },
  {
    label: "17:30",
    value: "17:30",
  },
  {
    label: "18:00",
    value: "18:00",
  },
  {
    label: "20:00",
    value: "20:00",
  },
];

const lunchValues = [
  {
    label: "JAH",
    value: "JAH",
  },
  {
    label: "EI",
    value: "EI",
  },
];

const DateOfOccurenceForm = (props) => {
  const [dateValue, setDateValue] = useState();
  const [showCalendar, setShowCalendar] = useState(false);
  const [loadValue, setLoadValue] = useState("");
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("");
  const [lunchValue, setLunchValue] = useState("");
  const [enteredDateIsValid, setEnteredDateIsValid] = useState(false);
  const [enteredLoadIsValid, setEnteredLoadIsValid] = useState(false);
  const [enteredStartTimeIsValid, setEnteredStartTimeIsValid] = useState(false);
  const [enteredEndTimeIsValid, setEnteredEndTimeIsValid] = useState(false);
  const [errorMessages, setErrorMessages] = useState({
    date: "",
    load: "",
    startTime: "",
    endTime: "",
  });

  const { mandatoryField, requiresDate, requiresEndDate, notUniqueDate } =
    content.errorMessages;

  useEffect(() => {
    if (props.onNotValidFields[props.index]) {
      setEnteredEndTimeIsValid(!props.onNotValidFields[props.index].endTime);
      if (!props.onNotValidFields[props.index].endTime) {
        setErrorMessages((prevState) => {
          return {
            ...prevState,
            endTime: requiresEndDate,
          };
        });
      }

      if (!props.onNotValidFields[props.index].date) {
        setEnteredDateIsValid(!props.onNotValidFields[props.index].date);
        setErrorMessages((prevState) => {
          return {
            ...prevState,
            date: notUniqueDate,
          };
        });
      }
      if (!dateValue) {
        setEnteredDateIsValid(true);
        setErrorMessages((prevState) => {
          return {
            ...prevState,
            date: requiresEndDate,
          };
        });
      }
    }
    if (props.onNotValidFields[props.index]?.date && dateValue) {
      setEnteredDateIsValid(false);
      setErrorMessages((prevState) => {
        return {
          ...prevState,
          date: "",
        };
      });
    }
  }, [props.onNotValidFields, props.index]);

  useEffect(() => {
    if (props.onAfterSubmit) {
      setLoadValue("");
      setStartTime("10:00");
      setEndTime("");
      setDateValue(new Date());
      setLunchValue("");
    }
  }, [props.onAfterSubmit]);

  const addDateHandler = (event) => {
    event.preventDefault();
    setShowCalendar((prevState) => (prevState = !prevState));
  };
  const loadChangeHandler = (load) => {
    setLoadValue(load);
    setEnteredLoadIsValid(false);
    if (!load.match(/(^0?[1-9]$)|(^1[0-2]$)/)) {
      setEnteredLoadIsValid(true);
    }
  };
  const calendarClickHandler = (date) => {
    setEnteredDateIsValid(false);
    setErrorMessages((prevState) => {
      return {
        ...prevState,
        date: "",
      };
    });
    if (!(formatMilliseconds(date) > formatMilliseconds(new Date()))) {
      setEnteredDateIsValid(true);
    }

    setDateValue(date);
    if (startTime.length > 0) {
      let valueArr = startTime.split(":");
      props.onChange(
        [
          {
            startTime: `${new Date(
              date.setHours(valueArr[0], valueArr[1], "00", "000")
            ).toISOString()}`,
          },
        ],
        props.index
      );
    }
    if (endTime.length > 0) {
      let valueArr = endTime.split(":");
      props.onChange(
        [
          {
            endTime: `${new Date(
              date.setHours(valueArr[0], valueArr[1], "00", "000")
            ).toISOString()}`,
          },
        ],
        props.index
      );
    }
    setShowCalendar((prevState) => (prevState = !prevState));
  };

  const startTimeChangeHandler = (value) => {
    setEnteredStartTimeIsValid(false);
    if (value.match(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)) {
      let valueArr = value.split(":");
      setStartTime(value);
      props.onChange(
        [
          {
            startTime: `${new Date(
              dateValue.setHours(valueArr[0], valueArr[1], "00", "000")
            ).toISOString()}`,
          },
        ],
        props.index
      );
    } else {
      setEnteredStartTimeIsValid(true);
      setStartTime(value);
      props.onChange(
        [
          {
            startTime: "",
          },
        ],
        props.index
      );
    }
  };
  const endTimeChangeHandler = (value) => {
    setEnteredEndTimeIsValid(false);
    if (value !== "") {
      setErrorMessages((prevState) => {
        return {
          ...prevState,
          endTime: "",
        };
      });
    }

    if (value.match(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)) {
      let valueArr = value.split(":");
      setEndTime(value);
      props.onChange(
        [
          {
            endTime: `${new Date(
              dateValue.setHours(valueArr[0], valueArr[1], "00", "000")
            ).toISOString()}`,
          },
        ],
        props.index
      );
    } else {
      setEnteredEndTimeIsValid(true);
      setEndTime(value);
      props.onChange(
        [
          {
            endTime: "",
          },
        ],
        props.index
      );
    }
  };

  const lunchChangeHandler = () => {
    let valueArr = endTime.split(":");
    if (endTime > "14:59" && lunchValue === "JAH") {
      setLunchValue("EI");

      props.onChange(
        [
          {
            endTime: `${new Date(
              dateValue.setHours(valueArr[0] - 1, valueArr[1], "00", "000")
            ).toISOString()}`,
          },
        ],
        props.index
      );
      setEndTime((prevState) => {
        let valueArr = prevState.split(":");
        return `${valueArr[0] - 1}:${valueArr[1]}`;
      });
    }
    if (endTime > "13:59" && lunchValue === "EI") {
      setLunchValue("JAH");
      props.onChange(
        [
          {
            endTime: `${new Date(
              dateValue.setHours(+valueArr[0] + 1, valueArr[1], "00", "000")
            ).toISOString()}`,
          },
        ],
        props.index
      );
      setEndTime((prevState) => {
        let valueArr = prevState.split(":");
        return `${+valueArr[0] + 1}:${valueArr[1]}`;
      });
    }
  };

  useEffect(() => {
    if (dateValue) {
      let valueArr = startTime.split(":");
      props.onChange(
        [
          {
            startTime: `${new Date(
              dateValue.setHours(valueArr[0], valueArr[1], "00", "000")
            ).toISOString()}`,
          },
        ],
        props.index
      );
    }
  }, []);

  useEffect(() => {
    if (loadValue > 0 && loadValue < 13 && startTime.length === 5) {
      setEndTime(loadCalculator(loadValue, startTime));
      let valueArr = loadCalculator(loadValue, startTime).split(":");
      props.onChange(
        [
          {
            endTime: `${new Date(
              dateValue.setHours(valueArr[0], valueArr[1], "00", "000")
            ).toISOString()}`,
          },
        ],
        props.index
      );
    }
    if (loadValue > 4) setLunchValue("JAH");
    if (loadValue < 5) setLunchValue("EI");
    if ((loadValue === "" || loadValue > 12) && endTime.length === 0) {
      setEndTime("");
      props.onChange(
        [
          {
            endTime: "",
          },
        ],
        props.index
      );
    }
  }, [loadValue, startTime]);

  const deleteRowHandler = () => {
    props.onDelete(props.index);
  };
  useEffect(() => {
    if (props.editMode) {
      setDateValue(new Date(props.editData.startTime));
      setStartTime(formatHoursMinutes(props.editData.startTime));
      setEndTime(formatHoursMinutes(props.editData.endTime));
    }
  }, []);

  return (
    <div
      className={
        props.index === 0 ? classes.container : classes.containerNoLabel
      }
    >
      <div className={classes.inputWithLabel}>
        <CalendarOneInput
          onShowCalendar={showCalendar}
          onClickDay={calendarClickHandler}
          value={dateValue}
          index={props.index}
          onClick={addDateHandler}
          label="Kuupäev"
          hasError={enteredDateIsValid}
          errorMessage={errorMessages.date}
        />
      </div>

      <div className={classes.inputWithLabel}>
        <InputWithLabel
          onChange={loadChangeHandler}
          type="text"
          name="workLoad"
          label="Maht"
          value={loadValue}
          index={props.index}
          hasError={enteredLoadIsValid}
          readOnly={!dateValue ? true : false}
          onErrorMessage={!dateValue ? requiresDate : errorMessages.load}
        />
      </div>

      <DropdownInput
        onLoad={startTimeChangeHandler}
        onChange={startTimeChangeHandler}
        options={beginValues}
        value={startTime}
        label="Algus"
        name="startTime"
        cssClass="dropdownOccurence"
        index={props.index}
        hasError={enteredStartTimeIsValid}
        readOnly={!dateValue ? true : false}
        showOptions={dateValue ? true : false}
        onErrorMessage={!dateValue ? requiresDate : errorMessages.startTime}
      />
      <DropdownInput
        onChange={endTimeChangeHandler}
        options={endValues}
        label="Lõpp"
        cssClass="dropdownOccurence"
        name="endTime"
        value={endTime}
        index={props.index}
        hasError={enteredEndTimeIsValid}
        readOnly={!dateValue ? true : false}
        showOptions={dateValue ? true : false}
        onErrorMessage={!dateValue ? requiresDate : errorMessages.endTime}
      />
      <div className={classes.inputWithLabel}>
        <InputWithLabel
          readOnly={true}
          onClick={lunchChangeHandler}
          label="Lõuna"
          cssClass="dropdownOccurence"
          name="hasLunch"
          value={lunchValue}
          index={props.index}
          onErrorMessage={!endTime ? requiresEndDate : ""}
        />
      </div>

      {!props.editMode && (
        <div className={classes.addRemove}>
          <div className={classes.iconRow}>
            {props.index === props.occurenceLength - 1 && !props.editMode && (
              <i
                onClick={props.onClick}
                className={`bi bi-plus-lg ${classes.addIcon}`}
              ></i>
            )}
            {props.occurenceLength > 1 && (
              <i
                onClick={deleteRowHandler}
                className={`${classes.deleteRowBtn} bi bi-x`}
              ></i>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DateOfOccurenceForm;
