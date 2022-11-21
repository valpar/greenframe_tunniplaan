import { Fragment, useCallback, useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import SearchDropdown from "../UI/Dropdown/SearchDropdown";
import CalendarInput from "../UI/Calendar/CalendarInput";
import classes from "./ScheduleFilters.module.css";

const ScheduleFilters = (props) => {
  const [courseData, setCourseData] = useState([]);
  const [lecturerData, setLecturerData] = useState([]);
  const [roomsData, setRoomsData] = useState([]);
  const [subjectsData, setSubjectsData] = useState([]);

  const {
    response: courseResponse,
    isLoading: courseLoading,
    error: courseError,
  } = useAxios({ method: "get", url: "/courses" });
  const {
    response: lecturerResponse,
    isLoading: lecturerLoading,
    error: lecturerError,
  } = useAxios({ method: "get", url: "/lecturers" });
  const {
    response: roomResponse,
    isLoading: roomLoading,
    error: roomError,
  } = useAxios({ method: "get", url: "/rooms" });
  const {
    response: subjectsResponse,
    isLoading: subjectsLoading,
    error: subjectsError,
  } = useAxios({ method: "get", url: "/subjects" });

  const workCourseData = useCallback(() => {
    if (!courseLoading && courseResponse !== undefined) {
      const courses = [];

      for (const key in courseResponse.courses) {
        courses.push({
          label: courseResponse.courses[key].courseCode,
          value: courseResponse.courses[key].courseCode,
        });
      }
      setCourseData(courses);
    }
  }, [courseLoading, courseResponse]);

  const workLecturerData = useCallback(() => {
    if (!lecturerLoading && lecturerResponse !== undefined) {
      const lecturers = [];

      for (const key in lecturerResponse.lecturers) {
        lecturers.push({
          label:
            lecturerResponse.lecturers[key].firstName +
            " " +
            lecturerResponse.lecturers[key].lastName,
          value:
            lecturerResponse.lecturers[key].firstName +
            " " +
            lecturerResponse.lecturers[key].lastName,
        });
      }
      setLecturerData(lecturers);
    }
  }, [lecturerLoading, lecturerResponse]);

  const workRoomsData = useCallback(() => {
    if (!roomLoading && roomResponse !== undefined) {
      const rooms = [];

      for (const key in roomResponse.rooms) {
        rooms.push({
          label: roomResponse.rooms[key].room,
          value: roomResponse.rooms[key].room,
        });
      }
      setRoomsData(rooms);
    }
  }, [roomLoading, roomResponse]);

  const workSubjectsData = useCallback(() => {
    if (!subjectsLoading && subjectsResponse !== undefined) {
      const subjects = [];

      for (const key in subjectsResponse.subjects) {
        subjects.push({
          label: subjectsResponse.subjects[key].subject,
          value: subjectsResponse.subjects[key].subject,
        });
      }
      setSubjectsData(subjects);
    }
  }, [subjectsLoading, subjectsResponse]);

  useEffect(() => {
    workCourseData();
  }, [workCourseData, courseResponse]);
  useEffect(() => {
    workLecturerData();
  }, [workLecturerData, lecturerResponse]);
  useEffect(() => {
    workRoomsData();
  }, [workRoomsData, roomResponse]);
  useEffect(() => {
    workSubjectsData();
  }, [workSubjectsData, subjectsResponse]);

  const filtersHandler = (filterObj) => {
    console.log(filterObj);
    props.onPassingFilters(filterObj);
  };

  return (
    <div className={classes.scheduleFilters}>
      <SearchDropdown
        onChange={filtersHandler}
        options={courseData}
        label="Kursus"
        name="courseCode"
        cssClass="dropdownFilters"
        isMulti={true}
      />
      <CalendarInput onChange={filtersHandler} />
      <SearchDropdown
        onChange={filtersHandler}
        options={subjectsData}
        label="Õppeaine"
        name="subject"
        cssClass="dropdownFilters"
        isMulti={true}
      />
      <SearchDropdown
        onChange={filtersHandler}
        options={lecturerData}
        label="Õppejõud"
        name="lecturer"
        cssClass="dropdownFilters"
        isMulti={true}
      />
      <SearchDropdown
        onChange={filtersHandler}
        options={roomsData}
        label="Ruum"
        name="room"
        cssClass="dropdownFilters"
        isMulti={true}
      />
    </div>
  );
};

export default ScheduleFilters;
