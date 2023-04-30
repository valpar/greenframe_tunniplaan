import { Calendar } from "react-calendar";
import InputWithLabel from "../Input/InputWithLabel";
import { dateParser, formatDate } from "../../../utils/Format/Date";
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
  const { isMobile, isDesktop } = props;

  useEffect(() => {
    setInputValue((prevState) =>
      props.value ? formatDate(dateParser(props.value)) : prevState
    );
  }, [props.value]);

  useEffect(() => {
    if (props.reset) setInputValue(undefined);
  }, [props.reset]);

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
      if (inputVal.match(/^([0-1]?[0-9]|31)$/)) {
        setNewInputValue(inputVal);
      }
      if (inputVal.match(/^([0-1]?[0-9]|31)[.]([0-9]|1[0-2])$/)) {
        setNewInputValue(inputVal);
      }
      if (inputValue?.length >= 6 && inputVal.match(/^\d+(\.\d+)*$/)) {
        setNewInputValue(inputVal);
      }
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
    <div className="relative w-full">
      {props.onShowCalendar && (
        <div
          className={`absolute w-full h-auto z-5 ${
            (props.label && props.index === 0) || isMobile ? "top-20" : "top-12"
          } border border-borderGray shadow`}
        >
          <Calendar
            minDate={date}
            onClickDay={props.onClickDay}
            value={props.value ? dateParser(props.value) : date}
            locale="et-EE"
            className="filters"
          />
        </div>
      )}
      {props.overlapping && (
        <label
          htmlFor="input"
          className={`absolute left-0 ml-2 text-xs -top-2 z-5 ${
            props.value
              ? "text-gray-500 bg-white px-1"
              : "text-gray-400 bg-transparent"
          }`}
        >
          {props.value ? props.placeholder : ""}
        </label>
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
        isMobile={isMobile}
        isDesktop={isDesktop}
      />
    </div>
  );
};

export default CalendarOneInput;
