import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "./Calendar.css";
import { formatDate } from "../../../utils/Format/Date";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { calculateSemesterDate } from "../../../utils/Calculate/Semester";

const CalendarInput = (props) => {
  const [calendarRange, setCalendarRange] = useState(
    calculateSemesterDate(true)
  );
  const [showBtnModal, setShowBtnModal] = useState(true);
  const [resetDate, setResetDate] = useState(false);
  const [activePeriod, setActivePeriod] = useState("");

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
      setActivePeriod("today");
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
      setActivePeriod("tomorrow");
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
      setActivePeriod("week");
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
      setActivePeriod("semester");
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
    setActivePeriod(null);
    setCalendarRange(date);
    setResetDate(true);
  };

  return (
    <div className="relative border group border-borderGray shadow">
      {!showBtnModal && <div className="green-peeper" />}
      <div
        className={
          showBtnModal
            ? `flex justify-between border-b-[1px] border-borderGray`
            : `flex justify-between bg-white`
        }
      >
        <div
          className={`relative flex justify-center lg:pr-10 ${
            showBtnModal ? "w-full" : "w-full text-zinc-500"
          }`}
        >
          <input
            className="h-11 text-center lg:px-1 hover:text-black duration-200"
            type="text"
            name="dateRange"
            value={`${formatDate(calendarRange[0])} - ${formatDate(
              calendarRange[1]
            )}`}
            readOnly
            onClick={toggleCalendarHandler}
          />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center">
            <div className="h-[1.7rem] w-0 border-r-[1px] border-borderGray" />
            <div className="flex justify-center items-center px-3 text-borderGray">
              {!showBtnModal && (
                <FontAwesomeIcon
                  icon={faAngleDown}
                  onClick={toggleCalendarHandler}
                />
              )}
              {showBtnModal && (
                <FontAwesomeIcon
                  icon={faAngleUp}
                  onClick={toggleCalendarHandler}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {showBtnModal && (
        <>
          <div className="">
            <Calendar
              minDate={new Date("2015-01-01")}
              onChange={changeDateHandler}
              value={calendarRange}
              locale="et-EE"
              showWeekNumbers={true}
              className="filters"
              selectRange={true}
              allowPartialRange={true}
            />
          </div>
          <div className="flex gap-2 justify-center p-2 lg:flex-col">
            <div className="flex flex-auto justify-evenly space-x-2">
              <button
                onClick={buttonDateHandler}
                name="today"
                className={`${
                  activePeriod === "today" ? "bg-borderGray" : ""
                } btn-period`}
              >
                Täna
              </button>
              <button
                onClick={buttonDateHandler}
                name="tomorrow"
                className={`${
                  activePeriod === "tomorrow" ? "bg-borderGray" : ""
                } btn-period`}
              >
                Homme
              </button>
            </div>
            <div className="flex flex-auto justify-evenly space-x-2">
              <button
                onClick={buttonDateHandler}
                name="week"
                className={`${
                  activePeriod === "week" ? "bg-borderGray" : ""
                } btn-period`}
              >
                Nädal
              </button>
              <button
                onClick={buttonDateHandler}
                name="semester"
                className={`${
                  activePeriod === "semester" ? "bg-borderGray" : ""
                } btn-period`}
              >
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
