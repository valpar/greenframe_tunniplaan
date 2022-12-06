import { Calendar } from "react-calendar";
import classes from "./CalendarOneInput.module.css";
import InputWithLabel from "../Input/InputWithLabel";
import {
  dateParser,
  formatDate,
  formatMilliseconds,
} from "../../../utils/Format/Date";
import { useEffect, useState } from "react";

const reverseDate = (str) => {
  return str.split(".").reverse().join("-");
};

const CalendarOneInput = (props) => {
  const [date, setDate] = useState(
    new Date(new Date().setDate(new Date().getDate() + 1))
  );
  const [inputValue, setInputValue] = useState();
  const [newInputValue, setNewInputValue] = useState();

  useEffect(() => {
    setInputValue((prevState) =>
      props.value ? formatDate(dateParser(props.value)) : prevState
    );
  }, [props.value]);

  useEffect(() => {
    setInputValue();
  }, [props.onReset]);

  const inputDateHandler = (inputVal) => {
    if (inputValue?.length > inputVal?.length) setNewInputValue(inputVal);
    else if (
      inputValue &&
      inputValue.match(/^(0[1-9]|[12][0-9]|3[01])$/) !== null
    )
      setNewInputValue((prevState) => (prevState = prevState + "."));
    else if (inputVal.match(/^(0[1-9]|[12][0-9]|3[01])$/) !== null)
      setNewInputValue(inputVal + ".");
    else if (inputVal.match(/^(0[1-9]|[12][0-9]|3[01])[.][.]$/) !== null)
      setNewInputValue(inputVal.substr(0, inputVal.length - 1));
    else if (
      inputValue &&
      inputValue.match(/^(0[1-9]|[12][0-9]|3[01])[.](0[1-9]|1[012])$/) !== null
    ) {
      setNewInputValue((prevState) => (prevState = prevState + "."));
    } else if (
      inputVal.match(/^(0[1-9]|[12][0-9]|3[01])[.](0[1-9]|1[012])$/) !== null
    )
      setNewInputValue(inputVal + ".");
    else if (
      inputVal.match(/^(0[1-9]|[12][0-9]|3[01])[.](0[1-9]|1[012])[.][.]$/) !==
      null
    )
      setNewInputValue(inputVal.substr(0, inputVal.length - 1));
    else if (
      inputVal.match(
        /^(0[1-9]|[12][0-9]|3[01])[.](0[1-9]|1[012])[.](19|20)\d\d$/
      ) !== null
    )
      setNewInputValue(inputVal);
    else if (inputVal.length > 10)
      setNewInputValue(inputVal.substr(0, inputVal.length - 1));
    else {
      setNewInputValue(inputVal);
    }
  };

  useEffect(() => {
    if (
      newInputValue &&
      newInputValue.match(
        /^(0[1-9]|[12][0-9]|3[01])[.](0[1-9]|1[012])[.](19|20)\d\d$/
      ) !== null
    ) {
      props.onClickDay(new Date(reverseDate(newInputValue)));
    } else {
      props.onClickDay(undefined);
    }
    setInputValue((prevState) => (prevState = newInputValue));
  }, [newInputValue]);

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
