import { Fragment, useEffect, useState } from "react";
import Calendar from "react-calendar";
import "./Calendar.css";
import classes from "./CalendarInput.module.css";
import { formatDate } from "../../../utils/Format/Date";

let now = new Date();

const CalendarInput = (props) => {
  const [startCalendar, setStartCalendar] = useState(new Date());
  const [endCalendar, setEndCalendar] = useState(
    new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      now.getDate(),
      now.getHours()
    )
  );
  const [pickStartDate, setPickStartDate] = useState(true);
  const [pickEndDate, setPickEndDate] = useState(false);
  const [showBtnModal, setShowBtnModal] = useState(true);

  const startDateHandler = () => {
    setShowBtnModal((prevState) => {
      return pickStartDate ? false : true;
    });
    setPickStartDate((prevState) => (prevState = !prevState));

    setPickEndDate((prevState) => {
      if (prevState) {
        return (prevState = !prevState);
      }
    });
  };
  const endDateHandler = () => {
    setShowBtnModal((prevState) => {
      return pickEndDate ? false : true;
    });
    setPickEndDate((prevState) => (prevState = !prevState));
    setPickStartDate((prevState) => {
      if (prevState) {
        return (prevState = !prevState);
      }
    });
  };

  const closeCalendarHandler = () => {
    setStartCalendar(new Date());

    if (showBtnModal) {
      setPickStartDate(false);
      setPickEndDate(false);
      setShowBtnModal(false);
    }
    if (!showBtnModal) {
      setPickStartDate(true);
      setShowBtnModal(true);
    }
  };

  useEffect(() => {
    props.onChange([
      {
        startTime: `${startCalendar}`,
        endTime: `${endCalendar}`,
      },
    ]);
  }, [startCalendar, endCalendar]);

  const changeCalendarStartHandler = (e) => {
    setStartCalendar(new Date(new Date(e).setHours(new Date().getHours())));

    setPickStartDate((prevState) => (prevState = !prevState));
    setPickEndDate((prevState) => (prevState = !prevState));
  };
  const changeCalendarEndHandler = (e) => {
    setEndCalendar(new Date(new Date(e).setHours(new Date().getHours())));

    setPickStartDate((prevState) => (prevState = !prevState));
    setPickEndDate((prevState) => (prevState = !prevState));
  };
  const buttonDateHandler = (event) => {
    event.preventDefault();
    const now = new Date();
    const now2 = new Date();
    const btnType = event.target.name;
    if (btnType === "today") {
      setStartCalendar(now);
      setEndCalendar(now);
    }
    if (btnType === "tomorrow") {
      setStartCalendar(new Date(now.setDate(now.getDate() + 1, now.getTime())));
      setEndCalendar(
        new Date(now2.setDate(now2.getDate() + 1, now2.getTime()))
      );
    }

    if (btnType === "week") {
      setStartCalendar(now2);
      setEndCalendar(new Date(now.setDate(now.getDate() + 7, now.getTime())));
    }

    if (btnType === "month") {
      setStartCalendar(now2);
      setEndCalendar(
        new Date(
          now.getFullYear(),
          now.getMonth() + 1,
          now.getDate(),
          now.getHours()
        )
      );
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.calendarInput}>
        <i
          className={`bi bi-chevron-down ${classes.openIcon}`}
          onClick={closeCalendarHandler}
        ></i>

        <input
          className={
            pickStartDate
              ? `${classes.startDate} ${classes.active}`
              : classes.startDate
          }
          type="text"
          name="startDate"
          value={formatDate(startCalendar)}
          readOnly
          onClick={startDateHandler}
        />
        <input
          className={
            pickEndDate
              ? `${classes.endDate} ${classes.active}`
              : classes.endDate
          }
          type="text"
          name="endDate"
          value={formatDate(endCalendar)}
          readOnly
          onClick={endDateHandler}
        />
        <div className={classes.verticalStripe} />
      </div>
      {showBtnModal && (
        <div className={classes.dateBtnContainer}>
          <div className={classes.btnRow}>
            <button onClick={buttonDateHandler} name="today">
              Täna
            </button>
            <button onClick={buttonDateHandler} name="tomorrow">
              Homme
            </button>
          </div>
          <div className={classes.btnRow}>
            <button onClick={buttonDateHandler} name="week">
              Nädal
            </button>
            <button onClick={buttonDateHandler} name="month">
              Kuu
            </button>
          </div>
        </div>
      )}
      <div className={classes.calendar}>
        {pickStartDate && (
          <Calendar
            onClickDay={changeCalendarStartHandler}
            onChange={setStartCalendar}
            value={startCalendar}
            locale="et-EE"
            showWeekNumbers={true}
            className="filters"
          />
        )}
        {pickEndDate && (
          <Calendar
            onClickDay={changeCalendarEndHandler}
            onChange={setEndCalendar}
            value={endCalendar}
            locale="et-EE"
            showWeekNumbers={true}
            className="filters"
            minDate={startCalendar}
          />
        )}
      </div>
    </div>
  );
};

export default CalendarInput;
