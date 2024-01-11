import { useState, useEffect, useCallback } from "react";
import useAxios from "../../hooks/useAxios";
import DateOfOccurenceForm from "./DateOfOccurenceForm";
import AddDropdown from "../UI/Dropdown/AddDropdown";
import axios from "axios";
import AddNewItem from "./AddNewItem";
import ConfirmModal from "../UI/ConfirmModal/ConfirmModal";
import content from "../../assets/content/content.json";
import RequestModal from "../UI/RequestModal/RequestModal";

axios.defaults.baseURL = `${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}`;

const ScheduleAddition = (props) => {
  const {
    editMode,
    editData,
    scheduled,
    onNewOccurence,
    onUpdate,
    onClose,
    isTabletOrMobile,
    forceLogoutHandler,
  } = props;

  const token = JSON.parse(sessionStorage.getItem('token'));
  
  const [courseData, setCourseData] = useState([]);
  const [teacherData, setTeacherData] = useState([]);
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
      teachers: "",
      distanceLink: "",
    },
  ]);

  const { teacherOccupiedMessage, roomOccupiedMessage, deleteMessage } =
    content.confirmModalMessages;
  const { mandatoryField } = content.errorMessages;

  useEffect(() => {
    if (editMode) {
      setAddedLecture([
        {
          comment: editData?.comment,
          rooms:
            editData?.rooms !== ""
              ? editData?.rooms?.map((e) => {
                  return { roomId: e.roomId };
                })
              : editData?.rooms,
          courses:
            editData?.courses !== ""
              ? editData?.courses?.map((e) => {
                  return { courseId: e.courseId };
                })
              : editData?.courses,
          subjectId: editData?.subject.id,
          teachers:
            editData?.teachers !== ""
              ? editData?.teachers?.map((e) => {
                  return { teacherId: e.teacherId };
                })
              : editData?.teachers,
          distanceLink: editData?.distanceLink,
        },
      ]);
      setNewOccurence([
        {
          startTime: editData?.startTime,
          endTime: editData?.endTime,
        },
      ]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [newDropdownItem, setNewDropdownItem] = useState(false);

  const {
    response: courseResponse,
    isLoading: courseLoading,
    //error: courseError,
  } = useAxios({ method: "get", url: "/courses" }, newDropdownItem);
  const {
    response: teacherResponse,
    isLoading: teacherLoading,
    //error: teacherError,
  } = useAxios({ method: "get", url: "/teachers" }, newDropdownItem);
  const {
    response: roomResponse,
    isLoading: roomLoading,
    //error: roomError,
  } = useAxios({ method: "get", url: "/rooms" }, newDropdownItem);
  const {
    response: subjectsResponse,
    isLoading: subjectsLoading,
    //error: subjectsError,
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
    if (!teacherLoading && teacherResponse !== undefined) {
      const teachers = [{ label: "Lisa uus...", value: "newLecturer" }];

      for (const key in teacherResponse.teachers) {
        teachers.push({
          label:
            teacherResponse.teachers[key].firstName +
            " " +
            teacherResponse.teachers[key].lastName,
          value: teacherResponse.teachers[key].id,
        });
      }
      setTeacherData(teachers);
    }
  }, [teacherLoading, teacherResponse]);

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
  }, [workLecturerData, teacherResponse]);
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
    const hasTeachers =
      dropDownValue.filter((value) => value.teacherId === "newLecturer")
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
    if (hasTeachers) {
      setShowAddModal(true);
      setModalContent("teachers");
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
          teachers:
            dropdown === "teacherId"
              ? dropDownValue
              : dropDownValue[0].value === "teacher"
              ? ""
              : prevState[0].teachers,
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
    if ((newOccurence || addedLecture[0].teachers?.length > 0) && scheduled) {
      const teacherOccupied = scheduled.filter((e) => {
        let teacher = [];
        if (e.teachers && addedLecture[0].teachers !== "") {
          teacher = e.teachers?.filter((teacherE) => {
            let lec = addedLecture[0].teachers.filter((element) => {
              return teacherE.teacherId === element.teacherId;
            });
            return lec.length > 0;
          });
        }

        for (let i = 0; i < newOccurence.length; i++) {
          if (
            teacher.length > 0 &&
            e.startTime <= newOccurence[i].startTime &&
            e.endTime > newOccurence[i].startTime
          ) {
            if (
              confirmdValues.filter((e) => {
                const teacherArr = teacher.filter(
                  (lec) => lec.teacherId === e
                );
                return teacherArr.length > 0 ? e : false;
              }).length > 0
            ) {
              return false;
            }
            setConfirmdValues((prevState) => [
              ...prevState,
              ...teacher.map((e) => e.teacherId),
            ]);
            setItemToDelete((prevState) => [...prevState, ...teacher]);
            return e;
          }
        }
        return false;
      });
      if (teacherOccupied.length > 0 && !editMode) {
        setShowConfirmModal({
          type: "teacher",
          show: true,
          message: teacherOccupiedMessage,
        });
      }
    }
    if ((newOccurence || addedLecture[0].rooms?.length > 0) && scheduled) {
      const roomOccupied = scheduled.filter((e) => {
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
      if (roomOccupied.length > 0 && !editMode) {
        setShowConfirmModal({
          type: "room",
          show: true,
          message: roomOccupiedMessage,
        });
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newOccurence, addedLecture[0].teachers, addedLecture[0].rooms]);

  useEffect(() => {
    const occurenceValidator = validateOccurences(newOccurence);
    if (!fieldsValid) {
      if (!startTimeUnique(occurenceValidator)) setFieldsValid(true);
      return setOccurencesIsValid(occurenceValidator);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    if (!editMode) {
      newOccurence.every(async (element) => {
        await axios
          .post(`/schedule`, {
            ...addedLecture[0],
            ...element,
          },
          {
            headers: { Authorization: `Bearer ${token.token}` },
          })
          .catch((error) =>  {
            setShowRequestModal(false);
            props.forceLogoutHandler();
            return error;
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
    if (editMode) {
      newOccurence.every(async (element) => {
        await axios
          .patch(`/schedule/${editData?.id}`, {
            ...addedLecture[0],
            ...element,
          },{
            headers: { Authorization: `Bearer ${token.token}` },
          })
          .catch((error) =>  {
            if (error.response.status === 401) {
              setShowRequestModal(false);
              props.forceLogoutHandler();
              return error;
            }
            return error;
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
        teachers: "",
        distanceLink: "",
      },
    ]);
    onNewOccurence();
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

  useEffect(() => {}, [newOccurence, addedLecture]);

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
    if (type === "teacher") {
      setConfirmdValues((prevState) => {
        const newArr = prevState.pop();
        return [...prevState.filter((e) => e !== newArr)];
      });
      setAddedLecture((prevState) => {
        let value = prevState[0][type + "s"];
        if (prevState[0].teachers?.length === 1) value = "";
        if (prevState[0].teachers?.length > 1) {
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
    await axios.delete(`/schedule/${editData?.id}`,{
      headers: { Authorization: `Bearer ${token.token}` },
    })
      .catch((error) =>  {
        setShowRequestModal(false);
        props.forceLogoutHandler();
        return error;
      })
      .then((res) => {
        if (res.status === 200) {
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
    if (value.type === "teacher") setModalContent("teachers");
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
          onUpdate();
        }
        setShowRequestModal(false);
        setRequestSuccess(false);
        setRequestMessage("");
        onClose();
      }, 2000);
      return () => clearTimeout(timer);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
        !editMode
          ? "mt-1 mb-8 lg:mt-3 border border-borderGray shadow-md"
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
          teacherData={teacherResponse}
          courseData={courseResponse}
          roomsData={roomResponse}
          modalFor={modalContent}
          onNewItem={newItemhandler}
          scheduled={scheduled}
          forceLogoutHandler={forceLogoutHandler}
        />
      )}
      <div className="relative text-sm md:text-base font-bold w-full">
        <h6>
          {editMode
            ? "LOENGU MUUTMINE TUNNIPLAANIS"
            : "LOENGU LISAMINE TUNNIPLAANI"}
        </h6>
        <i
          onClick={onClose}
          className={`bi bi-x-lg absolute -top-1 -right-1 lg:top-0 lg:right-0 cursor-pointer text-3xl lg:text-xl leading-5 lg:hover:text-black lg:hover:scale-105 duration-150`}
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
          options={teacherData}
          label="Õppejõud"
          name="teacher"
          isMulti={true}
          value={addedLecture[0].teachers}
          modalMessage={
            showConfirmModal.type === "teacher" ? showConfirmModal : null
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
                editMode={editMode}
                editData={editData}
                occurenceLength={newOccurence.length}
                isMobile={isMobile}
                isTabletOrMobile={isTabletOrMobile}
              />
            </div>
          );
        })}
      </div>

      <div
        className={`relative flex ${
          editMode ? "justify-between" : "justify-center lg:justify-end"
        } w-full px-2 lg:px-4 mb-4 mt-6 lg:mt-12`}
      >
        {editMode && (
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
              className="btn-actions"
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
          className="btn-actions"
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
