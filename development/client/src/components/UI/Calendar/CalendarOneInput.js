import { Calendar } from "react-calendar";
import classes from "./CalendarOneInput.module.css";
import InputWithLabel from "../Input/InputWithLabel";
import { dateParser, formatDate } from "../../../utils/Format/Date";
import { useState } from "react";

const CalendarOneInput = (props) => {
  const [date, setDate] = useState(
    new Date(new Date().setDate(new Date().getDate() + 1))
  );
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
        onClick={props.onClick}
        type="text"
        name={props.name ? props.name : "date"}
        label={props.label}
        readOnly={true}
        index={props.index}
        placeholder={props.placeholder}
        value={props.value ? formatDate(dateParser(props.value)) : ""}
        hasError={props.hasError}
        errorMessage={props.errorMessage}
        onErrorMessage={props.errorMessage !== "" ? props.errorMessage : ""}
      />
    </div>
  );
};

export default CalendarOneInput;
