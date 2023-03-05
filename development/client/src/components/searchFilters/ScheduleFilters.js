import { useCallback, useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import SearchDropdown from "../UI/Dropdown/SearchDropdown";
import CalendarInput from "../UI/Calendar/CalendarInput";

const ScheduleFilters = (props) => {
  const [courseData, setCourseData] = useState([]);
  const [lecturerData, setLecturerData] = useState([]);
  const [roomsData, setRoomsData] = useState([]);
  const [subjectsData, setSubjectsData] = useState([]);
  const [isReset, setIsReset] = useState(false);

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
    if (isReset) setIsReset((prevState) => (prevState = !prevState));
    props.onPassingFilters(filterObj);
  };
  const emptyFiltersHandler = () => {
    setIsReset((prevState) => (prevState = !prevState));
    props.onEmptyFilters();
  };

  return (
    <div className="flex flex-col space-y-2 -mt-1">
      <div className="order-2 lg:order1">
        <SearchDropdown
          reset={isReset}
          onChange={filtersHandler}
          options={courseData}
          label="Kursus"
          name="courseCode"
          isMulti={true}
          className="order-2"
        />
      </div>

      <div className="order-1 pb-2 lg:order-2 lg:pb-0 ">
        <CalendarInput reset={isReset} onChange={filtersHandler} />
      </div>

      <div className="order-3">
        <SearchDropdown
          reset={isReset}
          onChange={filtersHandler}
          options={subjectsData}
          label="Õppeaine"
          name="subject"
          isMulti={true}
        />
      </div>
      <div className="order-4">
        <SearchDropdown
          reset={isReset}
          onChange={filtersHandler}
          options={lecturerData}
          label="Õppejõud"
          name="lecturer"
          isMulti={true}
        />
      </div>
      <div className="order-5">
        <SearchDropdown
          reset={isReset}
          onChange={filtersHandler}
          options={roomsData}
          label="Ruum"
          name="room"
          isMulti={true}
        />
      </div>
      <button
        onClick={emptyFiltersHandler}
        type="button"
        name="admin"
        className=" order-6 mx-auto px-2 w-1/3 h-8 border border-borderGray shadow text-sm text-neutral-700 lg:w-1/2 lg:hover:bg-borderGray lg:hover:shadow-lg duration-200"
      >
        Tühjenda
      </button>
    </div>
  );
};

export default ScheduleFilters;
