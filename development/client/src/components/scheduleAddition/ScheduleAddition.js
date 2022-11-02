import { useState, useEffect, useCallback } from "react";
import useAxios from "../../hooks/useAxios";
import DateOfOccurenceForm from "../addScheduleInputForm/DateOfOccurenceForm";
import AddDropdown from "../UI/Dropdown/AddDropdown";
import classes from "./ScheduleAddition.module.css";
import axios from "axios";

const baseURL = "http://localhost:4000";

const ScheduleAddition = (props) => {
  const [courseData, setCourseData] = useState([]);
  const [lecturerData, setLecturerData] = useState([]);
  const [roomsData, setRoomsData] = useState([]);
  const [subjectsData, setSubjectsData] = useState([]);
  const [newOccurence, setNewOccurence] = useState([
    {
      startTime: "",
      endTime: "",
    },
  ]);
  const [addedLecture, setAddedLecture] = useState([
    {
      comment: "",
      rooms: "",
      courses: "",
      subjectId: null,
      lecturers: "",
      distanceLink: "",
    },
  ]);

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

  const [subjectValid, setSubjectValid] = useState(false);
  const [occurenesIsValid, setOccurencesIsValid] = useState([]);

  const [clearOccurenceFields, setClearOccurenceFields] = useState(false);

  const workCourseData = useCallback(() => {
    if (!courseLoading && courseResponse !== undefined) {
      const courses = [{ label: "Lisa uus...", value: "newCourse" }];

      for (const key in courseResponse.courses) {
        courses.push({
          label: courseResponse.courses[key].course,
          value: courseResponse.courses[key].id,
        });
      }
      setCourseData(courses);
    }
  }, [courseLoading, courseResponse]);

  const workLecturerData = useCallback(() => {
    if (!lecturerLoading && lecturerResponse !== undefined) {
      const lecturers = [{ label: "Lisa uus...", value: "newLecturer" }];

      for (const key in lecturerResponse.lecturers) {
        lecturers.push({
          label:
            lecturerResponse.lecturers[key].firstName +
            " " +
            lecturerResponse.lecturers[key].lastName,
          value: lecturerResponse.lecturers[key].id,
        });
      }
      setLecturerData(lecturers);
    }
  }, [lecturerLoading, lecturerResponse]);

  const workRoomsData = useCallback(() => {
    if (!roomLoading && roomResponse !== undefined) {
      const rooms = [{ label: "Lisa uus...", value: "newRoom" }];

      for (const key in roomResponse.rooms) {
        rooms.push({
          label: roomResponse.rooms[key].room,
          value: roomResponse.rooms[key].id,
        });
      }
      setRoomsData(rooms);
    }
  }, [roomLoading, roomResponse]);

  const workSubjectsData = useCallback(() => {
    if (!subjectsLoading && subjectsResponse !== undefined) {
      const subjects = [{ label: "Lisa uus...", value: "newSubject" }];

      for (const key in subjectsResponse.subjects) {
        subjects.push({
          label: subjectsResponse.subjects[key].subject,
          value: subjectsResponse.subjects[key].id,
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

  const dropdownHandler = (dropDownValue) => {
    if (dropDownValue[0].subjectId) setSubjectValid(false);
    setAddedLecture((prevState) => {
      const dropdown = Object.keys(dropDownValue[0])[0];
      return [
        {
          rooms: dropdown === "roomId" ? dropDownValue : prevState[0].rooms,
          courses:
            dropdown === "courseId" ? dropDownValue : prevState[0].courses,
          subjectId:
            dropdown === "subjectId"
              ? dropDownValue[0].subjectId
              : prevState[0].subjectId,
          lecturers:
            dropdown === "lecturerId" ? dropDownValue : prevState[0].lecturers,
          comment: prevState[0].comment,
          distanceLink: prevState[0].distanceLink,
        },
      ];
    });
  };

  const occurenceHandler = (occurence, index) => {
    if (clearOccurenceFields) setClearOccurenceFields(false);
    if (occurence[0].subjectId) setSubjectValid(false);
    setNewOccurence((prevState) => {
      const dropdown = Object.keys(occurence[0])[0];
      let newArr = [...prevState];
      newArr[index] = {
        startTime:
          dropdown === "startTime"
            ? occurence[0].startTime
            : prevState[index].startTime,
        endTime:
          dropdown === "endTime"
            ? occurence[0].endTime
            : prevState[index].endTime,
      };
      return newArr;
    });
  };

  const validateOccurences = (occurenceArray) => {
    let validated = [];
    occurenceArray.forEach((element, i, self) => {
      let newObj = { index: i, endTime: true, date: true };
      if (!(element.endTime !== "")) {
        newObj.endTime = false;
      }
      if (self.filter((e) => e.startTime === element.startTime).length > 1) {
        newObj.date = false;
      }
      validated.push(newObj);
    });
    console.log(validated);
    return validated;
  };

  const valitationFailed = (objArr) => {
    objArr.forEach((element) => {
      if (element.endTime !== true || element.date !== true) {
        return true;
      }
    });
    return false;
  };

  const submitScheduleHandler = () => {
    const hasSubject = addedLecture[0].subjectId !== null;
    const occurenceValidator = validateOccurences(newOccurence);
    if (!valitationFailed(occurenceValidator) && hasSubject) {
      newOccurence.forEach((element) => {
        axios.post(`${baseURL}/schedule`, { ...addedLecture[0], ...element });
      });
      setNewOccurence([
        {
          startTime: "",
          endTime: "",
        },
      ]);
      setClearOccurenceFields(true);
    } else {
      setOccurencesIsValid(occurenceValidator);
      setSubjectValid(!hasSubject);
    }
  };
  const newRowHandler = () => {
    setNewOccurence((prevState) => {
      return (prevState = [...prevState, { startTime: "", endTime: "jee" }]);
    });
  };
  const deleteRowHandler = (index) => {
    setNewOccurence((prevState) => {
      return [...prevState.filter((e, i) => i !== index)];
    });
  };

  useEffect(() => {
    console.log(newOccurence);
    console.log(addedLecture);
  }, [newOccurence, addedLecture]);

  return (
    <div className={classes.newScheduleItemModal}>
      <h6>LOENGU LISAMINE TUNNIPLAANI</h6>
      <div className={classes.dropdownsRow}>
        <AddDropdown
          onChange={dropdownHandler}
          cssClass="dropdownAddition"
          options={subjectsData}
          label="Õppeaine"
          name="subject"
          hasError={subjectValid}
        />
        <AddDropdown
          onChange={dropdownHandler}
          cssClass="dropdownAddition"
          options={lecturerData}
          label="Õppejõud"
          name="lecturer"
          isMulti={true}
        />
        <AddDropdown
          onChange={dropdownHandler}
          cssClass="dropdownAddition"
          options={courseData}
          label="Kursus"
          name="course"
          isMulti={true}
        />
        <AddDropdown
          onChange={dropdownHandler}
          cssClass="dropdownAddition"
          options={roomsData}
          label="Ruum"
          name="room"
          isMulti={true}
        />
      </div>
      {newOccurence.map((occurence, i) => {
        return (
          <div key={i} className={classes.occurenceRow}>
            <DateOfOccurenceForm
              onChange={occurenceHandler}
              onNewOccurence={[occurence]}
              index={i}
              onClick={newRowHandler}
              onDelete={deleteRowHandler}
              onNotValidFields={occurenesIsValid}
              onAfterSubmit={clearOccurenceFields}
            />
          </div>
        );
      })}

      <div className={classes.buttonRow}>
        <button
          onClick={submitScheduleHandler}
          className={classes.submitButton}
          type="submit"
        >
          SALVESTA
        </button>
      </div>
    </div>
  );
};

export default ScheduleAddition;
