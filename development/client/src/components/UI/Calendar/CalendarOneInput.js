import { Calendar } from "react-calendar";
import classes from "./CalendarOneInput.module.css";
import InputWithLabel from "../Input/InputWithLabel";
import { dateParser, formatDate } from "../../../utils/Format/Date";

const CalendarOneInput = (props) => {
  return (
    <div className={classes.calendar}>
      {props.onShowCalendar && (
        <Calendar
          onClickDay={props.onClickDay}
          value={dateParser(props.value)}
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
      />
    </div>
  );
};

export default CalendarOneInput;
