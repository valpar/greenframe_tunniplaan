import { useState, useEffect, useCallback } from "react";
import useAxios from "../../hooks/useAxios";
import DateOfOccurenceForm from "../addScheduleInputForm/DateOfOccurenceForm";
import AddDropdown from "../UI/Dropdown/AddDropdown";
import axios from "axios";
import AddNewItem from "../addNewObject/AddNewItem";
import ConfirmModal from "../UI/ConfirmModal/ConfirmModal";
import config from "../../config.json";
import content from "../../assets/content/content.json";
import RequestModal from "../UI/RequestModal/RequestModal";

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

  const { lecturerOccupiedMessage, roomOccupiedMessage, deleteMessage } =
    content.confirmModalMessages;
  const { mandatoryField } = content.errorMessages;

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
  const [showScheduleConfirmModal, setShowScheduleConfirmModal] =
    useState(false);
  const [itemToDelete, setItemToDelete] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editValues, setEditValues] = useState();
  const [confirmdValues, setConfirmdValues] = useState([]);
  const [requestError, setRequestError] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState(false);
  const [requestLoading, setRequestLoading] = useState(false);
  const [requestMessage, setRequestMessage] = useState("");
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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
          message: lecturerOccupiedMessage,
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
                return roomArr.length > 0 ? e : false;
              }).length > 0
            ) {
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
          message: roomOccupiedMessage,
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

  const saveScheduleHandler = () => {
    const hasSubject =
      addedLecture[0].subjectId !== null && addedLecture[0].subjectId !== "";
    const occurenceValidator = validateOccurences(newOccurence);
    if (!valitationFailed(occurenceValidator) && hasSubject) {
      setShowScheduleConfirmModal(true);
    } else {
      setFieldsValid(false);
      setOccurencesIsValid(occurenceValidator);
      setSubjectValid(!hasSubject);
      setErrorMessages((prevState) => {
        return {
          ...prevState,
          subject: mandatoryField,
        };
      });
    }
  };
  const closeScheduleConfirm = () => {
    setShowScheduleConfirmModal(false);
  };

  const submitScheduleHandler = async () => {
    setShowScheduleConfirmModal(false);
    setRequestLoading(true);
    setShowRequestModal(true);
    if (!props.editMode) {
      newOccurence.every(async (element) => {
        await axios
          .post(`/schedule`, {
            ...addedLecture[0],
            ...element,
          })
          .then((res) => {
            if (res.status === 200) {
              setRequestSuccess(true);
              setRequestLoading(false);
              setRequestMessage(content.successMessages.create);
            } else {
              setRequestLoading(false);
              setRequestError(true);
              setRequestMessage(content.errorMessages.requestAddError);
            }
          });
      });
    }
    if (props.editMode) {
      newOccurence.every(async (element) => {
        await axios
          .patch(`/schedule/${props.editData.id}`, {
            ...addedLecture[0],
            ...element,
          })
          .then((res) => {
            if (res.status === 200) {
              setRequestSuccess(true);
              setRequestLoading(false);
              setRequestMessage(content.successMessages.update);
            } else {
              setRequestLoading(false);
              setRequestError(true);
              setRequestMessage(content.errorMessages.requestUpdateError);
            }
          });
      });
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
    setRequestLoading(true);
    setShowRequestModal(true);
    await axios.delete(`/schedule/${props.editData.id}`).then((res) => {
      console.log(res.status);
      if (res.status === 200) {
        console.log("jee");
        setRequestSuccess(true);
        setRequestLoading(false);
        setRequestMessage(content.successMessages.delete);
      } else {
        setRequestLoading(false);
        setRequestError(true);
        setRequestMessage(content.errorMessages.requestAddError);
      }
    });
  };

  const editItemHandler = (value) => {
    setIsEditMode(true);
    setShowAddModal(true);
    if (value.type === "room") setModalContent("rooms");
    if (value.type === "course") setModalContent("courses");
    if (value.type === "lecturer") setModalContent("lecturers");
    if (value.type === "subject") setModalContent("subjects");
    setEditValues(value.value);
  };

  useEffect(() => {
    if (requestSuccess) {
      const timer = setTimeout(() => {
        if (
          requestMessage === content.successMessages.delete ||
          requestMessage === content.successMessages.update
        ) {
          props.onUpdate();
          props.onClose();
        }
        setShowRequestModal(false);
        setRequestSuccess(false);
        setRequestMessage("");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [requestSuccess]);

  const handleResize = () => {
    if (window.innerWidth <= 720) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });

  return (
    <div
      className={`flex flex-col justify-center items-center p-4 mb-0 w-full ${
        !props.editMode
          ? "mt-1 mb-8 lg:mt-4 border border-borderGray shadow-md"
          : "mb-0"
      }`}
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
      <div className="relative text-sm md:text-base font-bold w-full">
        <h6>
          {props.editMode
            ? "LOENGU MUUTMINE TUNNIPLAANIS"
            : "LOENGU LISAMINE TUNNIPLAANI"}
        </h6>
        <i
          onClick={props.onClose}
          className={`bi bi-x-lg absolute top-0 right-0 cursor-pointer text-xl leading-5 lg:hover:text-black lg:hover:scale-105 duration-150`}
        ></i>
      </div>

      <div className="flex flex-col justify-between items-start lg:px-4 space-y-3 lg:space-x-4 lg:space-y-0 py-8  w-full lg:flex-row">
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
      <div className="flex flex-col w-full lg:px-4  space-y-4">
        {newOccurence.map((occurence, i) => {
          return (
            <div key={i}>
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
                occurenceLength={newOccurence.length}
                isMobile={isMobile}
              />
            </div>
          );
        })}
      </div>

      <div
        className={`relative flex ${
          props.editMode ? "justify-between" : "justify-center lg:justify-end"
        } w-full px-2 lg:px-4 mb-4 mt-6 lg:mt-12`}
      >
        {props.editMode && (
          <>
            {showDeleteConfirmModal && (
              <div className="absolute lg:bottom-16 lg:-left-10">
                <ConfirmModal
                  bottomArrow={true}
                  modalMessage={deleteMessage}
                  onDecline={closeDeleteConfirm}
                  onConfirm={deleteScheduleRowHandler}
                />
              </div>
            )}
            <button
              onClick={deleteScheduleHandler}
              className="px-4 lg:px-8 py-2 font-bold text-sm border border-borderGray shadow hover:bg-borderGray hover:shadow-lg duration-150"
              type="button"
            >
              KUSTUTA
            </button>
          </>
        )}
        {showScheduleConfirmModal && (
          <div className="absolute lg:bottom-16 lg:-right-10">
            <ConfirmModal
              bottomArrow={true}
              modalMessage={content.confirmModalMessages.saveMessage}
              onDecline={closeScheduleConfirm}
              onConfirm={submitScheduleHandler}
            />
          </div>
        )}
        <button
          onClick={saveScheduleHandler}
          className="px-4 lg:px-8 py-2 font-bold text-sm border border-borderGray shadow hover:bg-borderGray hover:shadow-lg duration-150"
          type="submit"
        >
          SALVESTA
        </button>
      </div>
      {showRequestModal && (
        <RequestModal
          error={requestError}
          success={requestSuccess}
          loading={requestLoading}
          modalMessage={requestMessage}
          customStyle="lg:ml-32"
        />
      )}
    </div>
  );
};

export default ScheduleAddition;
