import { Fragment, useEffect, useState } from "react";
import Calendar from "react-calendar";
import "./Calendar.css";
import classes from "./CalendarInput.module.css";
import { formatDate } from "../../../utils/Format/Date";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faXmark } from "@fortawesome/free-solid-svg-icons";
import { calculateSemesterDate } from "../../../utils/Calculate/Semester";

const CalendarInput = (props) => {
  const [calendarRange, setCalendarRange] = useState(
    calculateSemesterDate(true)
  );
  const [showBtnModal, setShowBtnModal] = useState(true);
  const [resetDate, setResetDate] = useState(false);

  useEffect(() => {
    if (props.reset) {
      setCalendarRange(calculateSemesterDate(true));
    }
  }, [props.reset]);

  const toggleCalendarHandler = () => {
    setShowBtnModal((prevState) => (prevState = !prevState));
  };

  useEffect(() => {
    props.onChange([
      {
        startTime: `${calendarRange[0]}`,
        endTime: `${calendarRange[1]}`,
      },
    ]);
  }, [calendarRange]);

  const buttonDateHandler = (event) => {
    event.preventDefault();
    const now = new Date();
    const now2 = new Date();
    const today = new Date(
      now2.setDate(
        now2.getDate(),
        now2.setHours(0),
        now2.setMinutes(0),
        now2.setSeconds(0),
        now2.setMilliseconds(0)
      )
    );
    const btnType = event.target.name;
    if (btnType === "today") {
      setCalendarRange([
        today,
        new Date(
          now.setDate(
            now.getDate(),
            now.setHours(23),
            now.setMinutes(59),
            now.setSeconds(59),
            now.setMilliseconds(999)
          )
        ),
      ]);
      setResetDate(true);
    }
    if (btnType === "tomorrow") {
      setCalendarRange([
        new Date(
          now2.setDate(
            now2.getDate() + 1,
            now2.setHours(0),
            now2.setMinutes(0),
            now2.setSeconds(0),
            now2.setMilliseconds(0)
          )
        ),
        new Date(
          now.setDate(
            now.getDate() + 1,
            now.setHours(23),
            now.setMinutes(59),
            now.setSeconds(59),
            now.setMilliseconds(999)
          )
        ),
      ]);
      setResetDate(true);
    }

    if (btnType === "week") {
      setCalendarRange([
        today,
        new Date(
          now.setDate(
            now.getDate() +
              (now.getDay() === 0 ? now.getDay() : 7 - now.getDay()),
            now.setHours(23),
            now.setMinutes(59),
            now.setSeconds(59),
            now.setMilliseconds(999)
          )
        ),
      ]);
      setResetDate(true);
    }

    if (btnType === "semester") {
      setCalendarRange([...calculateSemesterDate()]);
      setResetDate(true);
    }
  };

  const resetDateHandler = () => {
    setResetDate(false);
    setCalendarRange(calculateSemesterDate(true));
  };

  const changeDateHandler = (date) => {
    if (date.length === 1) {
      let calendarDate = new Date(date);
      date.push(
        new Date(
          calendarDate.setDate(
            calendarDate.getDate(),
            calendarDate.setHours(23),
            calendarDate.setMinutes(59),
            calendarDate.setSeconds(59),
            calendarDate.setMilliseconds(999)
          )
        )
      );
    }
    setCalendarRange(date);
    setResetDate(true);
  };

  return (
    <div className={classes.container}>
      {!showBtnModal && <div className={classes.btnHover} />}
      <div
        className={
          showBtnModal ? classes.calendarInput : classes.calendarInputNoBorder
        }
      >
        <div
          className={showBtnModal ? classes.input : classes.inputPlaceholder}
        >
          <input
            className={classes.dateRange}
            type="text"
            name="dateRange"
            value={
              showBtnModal
                ? `${formatDate(calendarRange[0])} - ${formatDate(
                    calendarRange[1]
                  )}`
                : "Ajavahemik"
            }
            readOnly
            onClick={toggleCalendarHandler}
          />
        </div>

        <div className={classes.icons}>
          {showBtnModal && resetDate && (
            <FontAwesomeIcon
              onClick={resetDateHandler}
              className={classes.xmark}
              icon={faXmark}
            />
          )}
          <div className={classes.verticalStripe} />
          <div className={classes.openIcon}>
            <FontAwesomeIcon
              icon={faAngleDown}
              onClick={toggleCalendarHandler}
            />
          </div>
        </div>
      </div>
      {showBtnModal && (
        <>
          <div className={classes.calendar}>
            <Calendar
              onChange={changeDateHandler}
              value={calendarRange}
              locale="et-EE"
              showWeekNumbers={true}
              className="filters"
              selectRange={true}
              allowPartialRange={true}
            />
          </div>
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
              <button onClick={buttonDateHandler} name="semester">
                Semester
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CalendarInput;
