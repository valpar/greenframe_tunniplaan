import { Fragment, useEffect, useState } from "react";
import Calendar from "react-calendar";
import "./Calendar.css";
import classes from "./CalendarInput.module.css";
import { formatDate } from "../../../utils/Format/Date";

let now = new Date();

const CalendarInput = (props) => {
  const [startCalendar, setStartCalendar] = useState(new Date());
  const [endCalendar, setEndCalendar] = useState(
    new Date(now.getFullYear(), now.getMonth() + 1, now.getDate())
  );
  const [pickStartDate, setPickStartDate] = useState(true);
  const [pickEndDate, setPickEndDate] = useState(false);

  const startDateHandler = () => {
    setPickStartDate((prevState) => (prevState = !prevState));

    setPickEndDate((prevState) => {
      if (prevState) {
        return (prevState = !prevState);
      }
    });
  };
  const endDateHandler = () => {
    setPickEndDate((prevState) => (prevState = !prevState));
    setPickStartDate((prevState) => {
      if (prevState) {
        return (prevState = !prevState);
      }
    });
  };

  const closeCalendarHandler = () => {
    setStartCalendar(new Date());
    setEndCalendar(
      new Date(now.getFullYear(), now.getMonth() + 1, now.getDate())
    );

    setPickStartDate((prevState) => {
      if (prevState) {
        return (prevState = !prevState);
      }
    });
    setPickEndDate((prevState) => {
      if (prevState) {
        return (prevState = !prevState);
      }
    });
  };

  useEffect(() => {
    props.onChange([
      {
        startTime: `${startCalendar}`,
        endTime: `${endCalendar}`,
      },
    ]);
  }, [startCalendar, endCalendar]);

  return (
    <Fragment>
      <div className={classes.calendarInput}>
        {(pickStartDate || pickEndDate) && (
          <i className="bi bi-x-lg" onClick={closeCalendarHandler}></i>
        )}

        <input
          className={classes.startDate}
          type="text"
          name="startDate"
          value={formatDate(startCalendar)}
          readOnly
          onClick={startDateHandler}
        />
        <input
          className={classes.endDate}
          type="text"
          name="endDate"
          value={formatDate(endCalendar)}
          readOnly
          onClick={endDateHandler}
        />
        <div className={classes.verticalStripe} />
      </div>
      {pickStartDate && (
        <Calendar
          onChange={setStartCalendar}
          value={startCalendar}
          locale="et-EE"
          showWeekNumbers={true}
        />
      )}
      {pickEndDate && (
        <Calendar
          onChange={setEndCalendar}
          value={endCalendar}
          locale="et-EE"
        />
      )}
    </Fragment>
  );
};

export default CalendarInput;
