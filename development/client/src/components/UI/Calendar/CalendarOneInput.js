import { Calendar } from "react-calendar";
import classes from "./CalendarOneInput.module.css";
import InputWithLabel from "../Input/InputWithLabel";
import {
  dateParser,
  formatDate,
  formatMilliseconds,
} from "../../../utils/Format/Date";
import { useEffect, useState } from "react";

const CalendarOneInput = (props) => {
  const [date, setDate] = useState(
    new Date(new Date().setDate(new Date().getDate() + 1))
  );
  const [inputValue, setInputValue] = useState();

  useEffect(() => {
    setInputValue((prevState) =>
      props.value ? formatDate(dateParser(props.value)) : prevState
    );
  }, [props.value]);

  const inputDateHandler = (inputVal) => {
    let newInput = "";

    const reverseDate = (str) => {
      return str.split(".").reverse().join("-");
    };
    if (inputValue.length > inputVal.length) newInput = inputVal;
    else if (inputVal.match(/^(0[1-9]|[12][0-9]|3[01])$/) !== null)
      newInput = inputVal + ".";
    else if (inputVal.match(/^(0[1-9]|[12][0-9]|3[01])[.][.]$/) !== null)
      newInput = inputVal.substr(0, inputVal.length - 1);
    else if (
      inputVal.match(/^(0[1-9]|[12][0-9]|3[01])[.](0[1-9]|1[012])$/) !== null
    )
      newInput = inputVal + ".";
    else if (
      inputVal.match(/^(0[1-9]|[12][0-9]|3[01])[.](0[1-9]|1[012])[.][.]$/) !==
      null
    )
      newInput = inputVal.substr(0, inputVal.length - 1);
    else if (
      inputVal.match(
        /^(0[1-9]|[12][0-9]|3[01])[.](0[1-9]|1[012])[.](19|20)\d\d$/
      ) !== null
    )
      newInput = inputVal;
    else if (inputVal.length > 10)
      newInput = inputVal.substr(0, inputVal.length - 1);
    else {
      newInput = inputVal;
    }

    if (
      newInput.match(
        /^(0[1-9]|[12][0-9]|3[01])[.](0[1-9]|1[012])[.](19|20)\d\d$/
      ) !== null
    ) {
      props.onClickDay(new Date(reverseDate(newInput)));
    } else {
      props.onClickDay(undefined);
    }
    setInputValue((prevState) => (prevState = newInput));
  };

  return (
    <div className={classes.calendar}>
      {props.onShowCalendar && (
        <Calendar
          minDate={date}
          onClickDay={props.onClickDay}
          value={props.value ? dateParser(props.value) : date}
          className={
            props.index === 0
              ? classes.reactCalendar
              : classes.reactCalendarAfter
          }
          locale="et-EE"
        />
      )}

      <InputWithLabel
        onChange={inputDateHandler}
        onClick={props.onClick}
        type="text"
        name={props.name ? props.name : "date"}
        label={props.label}
        index={props.index}
        placeholder={props.placeholder}
        value={inputValue}
        hasError={props.hasError}
        errorMessage={props.errorMessage}
        onErrorMessage={props.errorMessage !== "" ? props.errorMessage : ""}
      />
    </div>
  );
};

export default CalendarOneInput;
