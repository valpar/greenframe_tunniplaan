import React, { useState, useEffect, useCallback, Fragment } from "react";
import classes from "./Home.module.css";
import useAxios from "../hooks/useAxios";

import * as dateService from "../utils/Format/Date";

import ScheduleFilters from "../components/searchFilters/ScheduleFilters";
import ScheduleAddition from "../components/scheduleAddition/ScheduleAddition";
import Table from "../components/UI/Table/Table";

const Home = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [newOccurenceAdded, setNewOccurenceAdded] = useState(false);
  const { response, loading, error } = useAxios(
    {
      method: "get",
      url: "/schedule",
    },
    newOccurenceAdded
  );

  const [dropdownsSelection, setDropdownSelection] = useState([]);
  const [admin, setAdmin] = useState(false);
  const [userLecturer, setUserLecturer] = useState(false);
  const [addSchedule, setAddSchedule] = useState(false);

  const work_Data = useCallback(() => {
    if (!loading && response !== undefined) {
      let schedule = response.schedule;
      schedule.forEach(function (o) {
        Object.keys(o).forEach(function (k) {
          if (o[k] === null) {
            o[k] = "";
          }
        });
      });
      setData(schedule);
      setFilteredData(schedule);
    }
  }, [loading, response]);

  useEffect(() => {
    work_Data();
  }, [work_Data]);

  const dropdownController = (data, obj) => {
    let filteredObj = data.filter(
      (e) => e[obj.flatMap(Object.keys)[0]] === undefined
    );
    if (
      obj[0].value === "courseCode" ||
      obj[0].value === "subject" ||
      obj[0].value === "lecturer" ||
      obj[0].value === "room"
    ) {
      return [...data.filter((e) => e[obj[0].value] === undefined)];
    }

    return [...obj, ...filteredObj];
  };

  const scheduleFilter = (filterObj, rawData, type) => {
    let filterType;
    if (type === "courses") filterType = "courseCode";
    else if (type === "lecturers") filterType = "lecturer";
    else if (type === "rooms") filterType = "room";
    else {
      filterType = type;
    }
    let filteredObjects = filterObj.filter((e) => e[filterType]);
    let objectKeys = filteredObjects.flatMap(Object.keys);
    let objectValues = filteredObjects.flatMap(Object.values);
    let filteredeData = [];
    if (type === "courses") {
      for (let i = 0; i < objectValues.length; i++) {
        filteredeData.push(
          ...rawData.filter((e) => {
            if (e.courses) {
              return e.courses
                .flatMap(Object.values)
                .some((el) => el === objectValues[i]);
            }
            return false;
          })
        );
      }
    }
    if (type === "lecturers") {
      for (let i = 0; i < objectValues.length; i++) {
        filteredeData.push(
          ...rawData.filter((e) => {
            if (e.lecturers) {
              let fullName = e.lecturers.map(
                (e) => `${e.firstName} ${e.lastName}`
              );
              return fullName.some((el) => el === objectValues[i]);
            }
            return false;
          })
        );
      }
    }
    if (type === "rooms") {
      for (let i = 0; i < objectValues.length; i++) {
        filteredeData.push(
          ...rawData.filter((e) => {
            if (e.rooms) {
              return e.rooms
                .flatMap(Object.values)
                .some((el) => el === objectValues[i]);
            }
            return false;
          })
        );
      }
    }
    if (type === "subject") {
      for (let i = 0; i < objectValues.length; i++) {
        filteredeData.push(
          ...rawData.filter((e) =>
            e.subject[objectKeys[i]].includes(objectValues[i])
          )
        );
      }
    }

    if (filterType === "startTime") {
      filteredeData.push(
        ...rawData.filter((e) => {
          let time1 = dateService.formatMilliseconds(e[objectKeys[0]]);
          let time2 = dateService.formatMilliseconds(objectValues[0]);
          let time3 =
            dateService.formatMilliseconds(objectValues[1]) +
            24 * 60 * 60 * 1000;
          return time1 >= time2 && time1 <= time3;
        })
      );
    }

    filteredeData = filteredeData.filter(
      (value, index, self) => index === self.findIndex((t) => t.id === value.id)
    );
    return filteredeData;
  };

  const dataFilterHandler = (dropdownValues) => {
    setDropdownSelection((prevState) => {
      return [...dropdownController(prevState, dropdownValues)];
    });
  };

  useEffect(() => {
    const hasStartTime = dropdownsSelection.find((o) => o.startTime);
    const hasCourse = dropdownsSelection.find((o) => o.courseCode);
    const hasSubject = dropdownsSelection.find((o) => o.subject);
    const hasLecturer = dropdownsSelection.find((o) => o.lecturer);
    const hasRoom = dropdownsSelection.find((o) => o.room);
    if (hasCourse) {
      setFilteredData([...scheduleFilter(dropdownsSelection, data, "courses")]);
    }
    if (hasSubject) {
      setFilteredData((prevState) => {
        return [
          ...scheduleFilter(
            dropdownsSelection,
            hasCourse ? prevState : data,
            "subject"
          ),
        ];
      });
    }
    if (hasLecturer) {
      setFilteredData((prevState) => {
        return [
          ...scheduleFilter(
            dropdownsSelection,
            hasCourse || hasSubject ? prevState : data,
            "lecturers"
          ),
        ];
      });
    }
    if (hasRoom) {
      setFilteredData((prevState) => {
        return [
          ...scheduleFilter(
            dropdownsSelection,
            hasCourse || hasLecturer || hasSubject ? prevState : data,
            "rooms"
          ),
        ];
      });
    }
    if (hasStartTime) {
      setFilteredData((prevState) => {
        return [
          ...scheduleFilter(
            dropdownsSelection,
            hasCourse || hasLecturer || hasSubject || hasRoom
              ? prevState
              : data,
            "startTime"
          ),
        ];
      });
    }
    if (dropdownsSelection.length === 0) {
      setFilteredData([...data]);
    }
  }, [data, dropdownsSelection]);

  filteredData.sort(
    (objA, objB) =>
      Number(new Date(objA.startTime)) - Number(new Date(objB.startTime))
  );

  const userRollHandler = (event) => {
    event.preventDefault();
    event.target.name === "admin"
      ? setAdmin((prevState) => (prevState = !prevState))
      : setUserLecturer((prevState) => (prevState = !prevState));
  };

  const addScheduleHandler = () => {
    setAddSchedule((prevState) => (prevState = !prevState));
  };

  const newOccurenceHandler = () => {
    setNewOccurenceAdded((prevState) => (prevState = !prevState));
  };

  const closeAdditionModalHandler = () => {
    setAddSchedule(false);
  };

  return (
    <Fragment>
      <div className={classes.container}>
        <div className={classes.scheduleFilters}>
          {admin && (
            <button
              onClick={addScheduleHandler}
              className={classes.addBtn}
              type="button"
            >
              LISA
            </button>
          )}
          <ScheduleFilters onPassingFilters={dataFilterHandler} />
        </div>

        <div className={classes.schedule}>
          {admin && addSchedule && (
            <ScheduleAddition
              scheduled={data}
              onNewOccurence={newOccurenceHandler}
              onClose={closeAdditionModalHandler}
            />
          )}
          {[
            ...new Set(filteredData.map((e) => e.startTime.substring(0, 10))),
          ].map((e, i, s) => {
            let noSchoolWork =
              dateService.formatMilliseconds(s[i + 1]) -
                dateService.formatMilliseconds(e) >
              86400000;

            return (
              <div key={i}>
                <div className={classes.scheduleDays}>
                  <div className={classes.scheduleDay}>
                    {dateService.formatWeekday(e)}
                  </div>
                  <div className={classes.scheduleDate}>
                    {dateService.formatDate(e)}
                  </div>
                </div>
                <Table
                  userLecturer={userLecturer}
                  admin={admin}
                  day={e}
                  filteredData={filteredData}
                  rawData={data}
                  onUpdate={newOccurenceHandler}
                />
                {noSchoolWork && (
                  <p className={classes.betweenTables}>
                    Tudengitele eraldatud aeg stressamiseks 🥸
                  </p>
                )}
              </div>
            );
          })}
        </div>
        <div className={classes.leftSide}>
          <button
            onClick={userRollHandler}
            className={classes.adminBtn}
            type="button"
            name="admin"
          >
            Haldus
          </button>
          <button
            onClick={userRollHandler}
            className={classes.adminBtn}
            type="button"
            name="lecturer"
          >
            Õppejõud
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
