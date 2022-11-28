import React, { useState, useEffect, useCallback, Fragment } from "react";
import classes from "./Home.module.css";
import useAxios from "../hooks/useAxios";

import * as dateService from "../utils/Format/Date";

import ScheduleFilters from "../components/searchFilters/ScheduleFilters";
import ScheduleAddition from "../components/scheduleAddition/ScheduleAddition";
import Table from "../components/UI/Table/Table";
import { ReactComponent as Logo } from "../assets/logo/HK-est.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faSolid } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const now = new Date();
  const [scheduleRequestParams, setScheduleRequestParams] = useState({
    startDate: new Date().toISOString(),
    endDate: new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      now.getDate(),
      now.getHours()
    ).toISOString(),
  });
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [newOccurenceAdded, setNewOccurenceAdded] = useState(false);
  const { response, loading, error } = useAxios(
    {
      method: "get",
      url: `/schedule/${scheduleRequestParams.startDate}/${scheduleRequestParams.endDate}`,
    },
    newOccurenceAdded
  );

  const [dropdownsSelection, setDropdownSelection] = useState([]);
  const [admin, setAdmin] = useState(false);
  const [userLecturer, setUserLecturer] = useState(false);
  const [addSchedule, setAddSchedule] = useState(false);
  const [showUsersModal, setShowUsersModal] = useState(false);

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
      const reverseDate = (str) => {
        return str.split(".").reverse().join(".");
      };
      filteredeData.push(
        ...rawData.filter((e) => {
          let time1 = dateService.formatMilliseconds(
            reverseDate(dateService.formatDate(e[objectKeys[0]]))
          );
          let time2 = dateService.formatMilliseconds(
            reverseDate(dateService.formatDate(objectValues[0]))
          );
          let time3 = dateService.formatMilliseconds(
            reverseDate(dateService.formatDate(objectValues[1]))
          );
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
    if (dropdownValues[0]?.startTime && dropdownValues[0]?.endTime) {
      setScheduleRequestParams({
        startDate: new Date(dropdownValues[0].startTime).toISOString(),
        endDate: new Date(dropdownValues[0]?.endTime).toISOString(),
      });
      setNewOccurenceAdded((prevState) => (prevState = !prevState));
    }
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
    if (event.target.name === "admin") {
      setAdmin(true);
      setUserLecturer(false);
    }
    if (event.target.name === "lecturer") {
      setAdmin(false);
      setUserLecturer(true);
    }
    if (event.target.name === "student") {
      setAdmin(false);
      setUserLecturer(false);
    }
    setShowUsersModal(false);
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
  const showUserRollesHandler = () => {
    setShowUsersModal(true);
  };
  const emptyFiltersHandler = () => {
    setFilteredData(data);
    setDropdownSelection([
      {
        startDate: new Date().toISOString(),
        endDate: new Date(
          now.getFullYear(),
          now.getMonth() + 1,
          now.getDate(),
          now.getHours()
        ).toISOString(),
      },
    ]);
  };
  const userPicture = admin
    ? "https://images.pexels.com/photos/3790811/pexels-photo-3790811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    : userLecturer
    ? "https://images.pexels.com/photos/4342401/pexels-photo-4342401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    : "https://images.pexels.com/photos/13180055/pexels-photo-13180055.jpeg?auto=compress&cs=tinysrgb&w=1600";

  return (
    <Fragment>
      <div className={classes.container}>
        <header className={classes.header}>
          <div className={classes.headerContent}>
            <div className={classes.logo}>
              <a
                href="https://www.tlu.ee/haapsalu"
                title="Avaleht"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Logo />
              </a>
            </div>
            <div className={classes.headerBtns}>
              <div className={classes.slash}></div>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://start.hk.tlu.ee/sahtelbeta/sahtel/index.php"
              >
                <i>SAHTEL</i>
              </a>
              <div className={classes.slash}></div>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              >
                <i>RIIUL</i>
              </a>
            </div>
            <div className={classes.login}>
              <div className={classes.userInfo}>
                <img
                  onClick={showUserRollesHandler}
                  src={userPicture}
                  alt="User"
                ></img>
              </div>
              {showUsersModal && (
                <div className={classes.userContainer}>
                  <div className={classes.boxArrow}></div>
                  <div className={classes.userInfoBox}>
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
                    <button
                      onClick={userRollHandler}
                      className={classes.adminBtn}
                      type="button"
                      name="student"
                    >
                      Õpilane
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className={classes.line} />
        </header>
        <div className={classes.mainContainer}>
          <div className={classes.scheduleFilters}>
            <div className={classes.fixedFilters}>
              {admin && (
                <div className={classes.addBtn}>
                  <div className={classes.btnHover} />
                  <button onClick={addScheduleHandler} type="button">
                    LISA
                  </button>
                  <FontAwesomeIcon
                    icon={faAngleRight}
                    className={classes.faAngleRight}
                  />
                </div>
              )}
              {!admin && !userLecturer && (
                <div className={classes.loginInBtn}>
                  <div className={classes.btnHover} />
                  <button type="button">LOGI SISSE</button>
                </div>
              )}
              <ScheduleFilters
                onEmptyFilters={emptyFiltersHandler}
                onPassingFilters={dataFilterHandler}
              />
            </div>
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
            {filteredData.length === 0 && (
              <p className={classes.betweenTables}>
                Tudengitele eraldatud aeg stressamiseks 🥸
              </p>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
