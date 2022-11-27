import { useState, useEffect, useCallback } from "react";
import useAxios from "../../hooks/useAxios";
import DateOfOccurenceForm from "../addScheduleInputForm/DateOfOccurenceForm";
import AddDropdown from "../UI/Dropdown/AddDropdown";
import classes from "./ScheduleAddition.module.css";
import axios from "axios";
import AddNewItem from "../addNewObject/AddNewItem";
import TooltipLarge from "../UI/Tooltip/TooltipLarge";
import ConfirmModal from "../UI/ConfirmModal/ConfirmModal";
import config from "../../config.json";

axios.defaults.baseURL = config.api.url;

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
  useEffect(() => {
    if (props.editMode) {
      setAddedLecture([
        {
          comment: props.editData.comment,
          rooms:
            props.editData.rooms !== ""
              ? props.editData.rooms?.map((e) => {
                  return { roomId: e.roomId };
                })
              : props.editData.rooms,
          courses:
            props.editData.courses !== ""
              ? props.editData.courses?.map((e) => {
                  return { courseId: e.courseId };
                })
              : props.editData.courses,
          subjectId: props.editData.subject.id,
          lecturers:
            props.editData.lecturers !== ""
              ? props.editData.lecturers?.map((e) => {
                  return { lecturerId: e.lecturerId };
                })
              : props.editData.lecturers,
          distanceLink: props.editData.distanceLink,
        },
      ]);
      setNewOccurence([
        {
          startTime: props.editData.startTime,
          endTime: props.editData.endTime,
        },
      ]);
    }
  }, []);
  const [newDropdownItem, setNewDropdownItem] = useState(false);

  const {
    response: courseResponse,
    isLoading: courseLoading,
    error: courseError,
  } = useAxios({ method: "get", url: "/courses" }, newDropdownItem);
  const {
    response: lecturerResponse,
    isLoading: lecturerLoading,
    error: lecturerError,
  } = useAxios({ method: "get", url: "/lecturers" }, newDropdownItem);
  const {
    response: roomResponse,
    isLoading: roomLoading,
    error: roomError,
  } = useAxios({ method: "get", url: "/rooms" }, newDropdownItem);
  const {
    response: subjectsResponse,
    isLoading: subjectsLoading,
    error: subjectsError,
  } = useAxios({ method: "get", url: "/subjects" }, newDropdownItem);

  const [subjectValid, setSubjectValid] = useState(false);
  const [errorMessages, setErrorMessages] = useState({
    subject: "",
  });
  const [occurenesIsValid, setOccurencesIsValid] = useState([]);
  const [clearOccurenceFields, setClearOccurenceFields] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [fieldsValid, setFieldsValid] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState({
    type: "",
    show: false,
    message: "",
  });
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editValues, setEditValues] = useState();
  const [confirmdValues, setConfirmdValues] = useState([]);

  const workCourseData = useCallback(() => {
    if (!courseLoading && courseResponse !== undefined) {
      const courses = [{ label: "Lisa uus...", value: "newCourse" }];

      for (const key in courseResponse.courses) {
        courses.push({
          label: courseResponse.courses[key].courseCode,
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
    return validated;
  };

  const valitationFailed = (objArr) => {
    for (let i = 0; i < objArr.length; i++) {
      if (objArr[i].endTime !== true || objArr[i].date !== true) {
        return true;
      }
    }
    return false;
  };

  const startTimeUnique = (objArr) => {
    for (let i = 0; i < objArr.length; i++) {
      if (objArr[i].date !== true) {
        return true;
      }
    }
    return false;
  };

  const dropdownHandler = (dropDownValue) => {
    const hasLecturers =
      dropDownValue.filter((value) => value.lecturerId === "newLecturer")
        .length > 0;
    const hasCourses =
      dropDownValue.filter((value) => value.courseId === "newCourse").length >
      0;
    const hasRooms =
      dropDownValue.filter((value) => value.roomId === "newRoom").length > 0;

    if (dropDownValue[0].subjectId === "newSubject") {
      setShowAddModal(true);
      setModalContent("subjects");
      return;
    }
    if (hasLecturers) {
      setShowAddModal(true);
      setModalContent("lecturers");
      return;
    }
    if (hasCourses) {
      setShowAddModal(true);
      setModalContent("courses");
      return;
    }
    if (hasRooms) {
      setShowAddModal(true);
      setModalContent("rooms");
      return;
    }
    if (dropDownValue[0].subjectId) {
      setErrorMessages((prevState) => {
        return {
          ...prevState,
          subject: "",
        };
      });
      setSubjectValid(false);
    }
    setAddedLecture((prevState) => {
      const dropdown = Object.keys(dropDownValue[0])[0];
      return [
        {
          rooms:
            dropdown === "roomId"
              ? dropDownValue
              : dropDownValue[0].value === "room"
              ? ""
              : prevState[0].rooms,
          courses:
            dropdown === "courseId"
              ? dropDownValue
              : dropDownValue[0].value === "course"
              ? ""
              : prevState[0].courses,
          subjectId:
            dropdown === "subjectId"
              ? dropDownValue[0].subjectId
              : prevState[0].subjectId,
          lecturers:
            dropdown === "lecturerId"
              ? dropDownValue
              : dropDownValue[0].value === "lecturer"
              ? ""
              : prevState[0].lecturers,
          comment: prevState[0].comment,
          distanceLink: prevState[0].distanceLink,
        },
      ];
    });
  };

  const occurenceHandler = (occurence, index) => {
    console.log(occurence);
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
  useEffect(() => {
    if (
      (newOccurence || addedLecture[0].lecturers?.length > 0) &&
      props.scheduled
    ) {
      const lecturerOccupied = props.scheduled.filter((e) => {
        let lecturer = [];
        if (e.lecturers && addedLecture[0].lecturers !== "") {
          lecturer = e.lecturers?.filter((lecturerE) => {
            let lec = addedLecture[0].lecturers.filter((element) => {
              return lecturerE.lecturerId === element.lecturerId;
            });
            return lec.length > 0;
          });
        }

        for (let i = 0; i < newOccurence.length; i++) {
          if (
            lecturer.length > 0 &&
            e.startTime <= newOccurence[i].startTime &&
            e.endTime > newOccurence[i].startTime
          ) {
            if (
              confirmdValues.filter((e) => {
                const lecturerArr = lecturer.filter(
                  (lec) => lec.lecturerId === e
                );
                return lecturerArr.length > 0 ? e : false;
              }).length > 0
            ) {
              return false;
            }
            setConfirmdValues((prevState) => [
              ...prevState,
              ...lecturer.map((e) => e.lecturerId),
            ]);
            setItemToDelete((prevState) => [...prevState, ...lecturer]);
            return e;
          }
        }
        return false;
      });
      if (lecturerOccupied.length > 0 && !props.editMode) {
        setShowConfirmModal({
          type: "lecturer",
          show: true,
          message: "ÕPPEJÕUD ON HÕIVATUD",
        });
      }
    }
    if (
      (newOccurence || addedLecture[0].rooms?.length > 0) &&
      props.scheduled
    ) {
      const roomOccupied = props.scheduled.filter((e) => {
        let room = [];
        if (e.rooms && addedLecture[0].rooms !== "") {
          room = e.rooms?.filter((roomE) => {
            let roomArr = addedLecture[0].rooms.filter((element) => {
              return roomE.roomId === element.roomId;
            });
            return roomArr.length > 0;
          });
        }

        for (let i = 0; i < newOccurence.length; i++) {
          if (
            room.length > 0 &&
            e.startTime <= newOccurence[i].startTime &&
            e.endTime > newOccurence[i].startTime
          ) {
            if (
              confirmdValues.filter((e) => {
                const roomArr = room.filter((r) => r.roomId === e);
                console.log(roomArr);
                return roomArr.length > 0 ? e : false;
              }).length > 0
            ) {
              console.log("jee");
              return false;
            }
            setConfirmdValues((prevState) => [
              ...prevState,
              ...room.map((e) => e.roomId),
            ]);
            setItemToDelete((prevState) => [...prevState, ...room]);
            return e;
          }
        }
        return false;
      });
      if (roomOccupied.length > 0 && !props.editMode) {
        setShowConfirmModal({
          type: "room",
          show: true,
          message: "RUUM ON HÕIVATUD",
        });
      }
    }
  }, [newOccurence, addedLecture[0].lecturers, addedLecture[0].rooms]);

  useEffect(() => {
    const occurenceValidator = validateOccurences(newOccurence);
    if (!fieldsValid) {
      if (!startTimeUnique(occurenceValidator)) setFieldsValid(true);
      return setOccurencesIsValid(occurenceValidator);
    }
  }, [newOccurence]);

  const submitScheduleHandler = async () => {
    const hasSubject =
      addedLecture[0].subjectId !== null && addedLecture[0].subjectId !== "";
    const occurenceValidator = validateOccurences(newOccurence);
    if (!valitationFailed(occurenceValidator) && hasSubject) {
      if (!props.editMode) {
        newOccurence.forEach(async (element) => {
          await axios
            .post(`/schedule`, {
              ...addedLecture[0],
              ...element,
            })
            .then((res) => console.log(res));
        });
      }
      if (props.editMode) {
        newOccurence.forEach(async (element) => {
          await axios
            .patch(`/schedule/${props.editData.id}`, {
              ...addedLecture[0],
              ...element,
            })
            .then((res) => console.log(res));
        });
        props.onUpdate();
        props.onClose();
        return;
      }

      setNewOccurence([
        {
          startTime: "",
          endTime: "",
        },
      ]);
      setOccurencesIsValid([]);
      setClearOccurenceFields(true);
      setAddedLecture([
        {
          comment: "",
          rooms: "",
          courses: "",
          subjectId: "",
          lecturers: "",
          distanceLink: "",
        },
      ]);
      props.onNewOccurence();
    } else {
      setFieldsValid(false);
      setOccurencesIsValid(occurenceValidator);
      setSubjectValid(!hasSubject);
      setErrorMessages((prevState) => {
        return {
          ...prevState,
          subject: "ÕPPEAINE ON KOHUSTUSLIK",
        };
      });
    }
  };
  const newRowHandler = () => {
    setNewOccurence((prevState) => {
      return (prevState = [...prevState, { startTime: "", endTime: "" }]);
    });
  };
  const deleteRowHandler = (index) => {
    setNewOccurence((prevState) => {
      return [...prevState.filter((e, i) => i !== index)];
    });
    setOccurencesIsValid((prevState) => {
      return [...prevState.filter((e, i) => i !== index)];
    });
  };

  useEffect(() => {
    console.log(newOccurence);
    console.log(addedLecture);
  }, [newOccurence, addedLecture]);

  const closeModalHandler = (dropdownToReset) => {
    setShowAddModal(false);
    setIsEditMode(false);

    if (dropdownToReset) {
      setAddedLecture((prevState) =>
        prevState.map((obj) => {
          return {
            ...obj,
            [dropdownToReset]: "",
          };
        })
      );
    }
  };

  const newItemhandler = (itemName, hasNewItem) => {
    setNewDropdownItem((prevState) => (prevState = !prevState));
    setAddedLecture((prevState) =>
      prevState.map((obj) => {
        return {
          ...obj,
          [itemName]: hasNewItem,
        };
      })
    );
  };

  const deleteItemHandler = () => {
    setNewDropdownItem((prevState) => (prevState = !prevState));
  };

  const dropdownConfirmHandler = () => {
    setShowConfirmModal({
      type: "",
      show: false,
      message: "",
    });
    setItemToDelete([]);
  };
  const dropdownDeclineHandler = (type) => {
    setShowConfirmModal({
      type: "",
      show: false,
      message: "",
    });
    if (type === "room") {
      setConfirmdValues((prevState) => {
        const newArr = prevState.pop();
        return [...prevState.filter((e) => e !== newArr)];
      });
      setAddedLecture((prevState) => {
        let value = prevState[0][type + "s"];
        if (prevState[0].rooms?.length === 1) value = "";
        if (prevState[0].rooms?.length > 1) {
          value = value.filter((e) => {
            let arr = itemToDelete?.filter(
              (item) => item[type + "Id"] === e[type + "Id"]
            );
            return arr.length === 0;
          });
        }
        return [
          {
            ...prevState[0],
            [type + "s"]: value,
          },
        ];
      });
    }
    if (type === "lecturer") {
      setConfirmdValues((prevState) => {
        const newArr = prevState.pop();
        return [...prevState.filter((e) => e !== newArr)];
      });
      setAddedLecture((prevState) => {
        let value = prevState[0][type + "s"];
        if (prevState[0].lecturers?.length === 1) value = "";
        if (prevState[0].lecturers?.length > 1) {
          value = value.filter((e) => {
            let arr = itemToDelete?.filter(
              (item) => item[type + "Id"] === e[type + "Id"]
            );
            return arr.length === 0;
          });
        }
        return [
          {
            ...prevState[0],
            [type + "s"]: value,
          },
        ];
      });
    }

    setItemToDelete([]);
  };

  const deleteScheduleHandler = () => {
    setShowDeleteConfirmModal(true);
  };
  const closeDeleteConfirm = () => {
    setShowDeleteConfirmModal(false);
  };
  const deleteScheduleRowHandler = async () => {
    setShowDeleteConfirmModal(false);
    await axios.delete(`/schedule/${props.editData.id}`).then((response) => {
      console.log(response);
    });
    props.onUpdate();
    props.onClose();
  };
  const editItemHandler = (value) => {
    setIsEditMode(true);
    setShowAddModal(true);
    console.log(value);
    if (value[0]?.roomId) setModalContent("rooms");
    if (value[0]?.courseId) setModalContent("courses");
    if (value[0]?.lecturerId) setModalContent("lecturers");
    if (typeof value === "number") setModalContent("subjects");
    setEditValues(value);
  };
  return (
    <div
      className={
        props.editMode
          ? classes.editScheduleModal
          : classes.newScheduleItemModal
      }
    >
      {showAddModal && (
        <AddNewItem
          editValues={editValues}
          editMode={isEditMode}
          onDelete={deleteItemHandler}
          onClose={closeModalHandler}
          subjectsData={subjectsResponse}
          lecturerData={lecturerResponse}
          courseData={courseResponse}
          roomsData={roomResponse}
          modalFor={modalContent}
          onNewItem={newItemhandler}
          scheduled={props.scheduled}
        />
      )}
      <div className={classes.headingRow}>
        <h6>
          {props.editMode
            ? "LOENGU MUUTMINE TUNNIPLAANIS"
            : "LOENGU LISAMINE TUNNIPLAANI"}
        </h6>
        <i onClick={props.onClose} className={`bi bi-x-lg`}></i>
      </div>

      <div className={classes.dropdownsRow}>
        <AddDropdown
          onEdit={editItemHandler}
          onChange={dropdownHandler}
          cssClass="dropdownAddition"
          options={subjectsData}
          label="Õppeaine"
          name="subject"
          hasError={subjectValid}
          value={addedLecture[0].subjectId}
          onErrorMessage={errorMessages.subject}
        />
        <AddDropdown
          onEdit={editItemHandler}
          onChange={dropdownHandler}
          cssClass="dropdownAddition"
          options={lecturerData}
          label="Õppejõud"
          name="lecturer"
          isMulti={true}
          value={addedLecture[0].lecturers}
          modalMessage={
            showConfirmModal.type === "lecturer" ? showConfirmModal : null
          }
          onConfirm={dropdownConfirmHandler}
          onDecline={dropdownDeclineHandler}
        />
        <AddDropdown
          onEdit={editItemHandler}
          onChange={dropdownHandler}
          cssClass="dropdownAddition"
          options={courseData}
          label="Kursus"
          name="course"
          isMulti={true}
          value={addedLecture[0].courses}
        />
        <AddDropdown
          onEdit={editItemHandler}
          onChange={dropdownHandler}
          cssClass="dropdownAddition"
          options={roomsData}
          label="Ruum"
          name="room"
          isMulti={true}
          modalMessage={
            showConfirmModal.type === "room" ? showConfirmModal : null
          }
          onConfirm={dropdownConfirmHandler}
          onDecline={dropdownDeclineHandler}
          value={addedLecture[0].rooms}
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
              editMode={props.editMode}
              editData={props.editData}
            />
          </div>
        );
      })}

      <div
        className={
          props.editMode
            ? `${classes.buttonRow} ${classes.editMode}`
            : `${classes.buttonRow}`
        }
      >
        {props.editMode && (
          <>
            {showDeleteConfirmModal && (
              <div className={classes.deleteConfirm}>
                <ConfirmModal
                  bottomArrow={true}
                  modalMessage="KINNITA KUSTUTAMINE"
                  onDecline={closeDeleteConfirm}
                  onConfirm={deleteScheduleRowHandler}
                />
              </div>
            )}
            <button
              onClick={deleteScheduleHandler}
              className={classes.submitButton}
              type="button"
            >
              KUSTUTA
            </button>
          </>
        )}
        <button
          onClick={submitScheduleHandler}
          className={classes.submitButton}
          type="submit"
        >
          SALVESTA
        </button>
      </div>
      {/* <div className={classes.overLay}>
        <div class={`spinner-border ${classes.spinner}`} role="status"></div>
        <span class={`sr-only ${classes.spinnerMessage}`}>Laeb...</span>
      </div>
      <div className={classes.message}>Greate succsess</div> */}
    </div>
  );
};

export default ScheduleAddition;
