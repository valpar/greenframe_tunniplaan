import { useEffect } from "react";
import { useState } from "react";
import InputWithPlaceholder from "../../UI/Input/InputWithPlaceholder";
import classes from "./NewCourse.module.css";

const NewCourse = (props) => {
  const { onChange, index } = props;
  const [enteredCourseData, setEnteredCourseData] = useState({
    courseName: "",
    courseCode: "",
  });
  const [errorMessage, setErrorMessages] = useState({
    courseName: "",
    courseCode: "",
  });

  useEffect(() => {
    if (props.editMode) {
      setEnteredCourseData(
        props.courseData.courses.filter((e) => {
          let arr = props.editValues.filter(
            (course) => course.courseId === e.id
          );
          return arr.length !== 0
            ? {
                courseName: e.courseName,
                courseCode: e.courseCode,
              }
            : false;
        })[0]
      );
    }
    setErrorMessages({ courseName: null, courseCode: null });
  }, []);

  const inputChangeHandler = (value) => {
    const isCourseName = value.name === "courseName";
    const isCourseCode = value.name === "courseCode";
    const hasValue = value.value !== "";

    if (isCourseName) {
      const courseNameExists =
        props.courseData.courses.filter((e) => e.courseName === value.value)
          .length > 0;

      (courseNameExists || !hasValue) && !props.editMode
        ? setErrorMessages((prevState) => {
            return {
              ...prevState,
              courseName: courseNameExists
                ? "LÜHEND EKSISTEERIB"
                : "KOHUSTUSLIK",
            };
          })
        : setErrorMessages((prevState) => {
            return { ...prevState, courseName: null };
          });
      setEnteredCourseData((prevState) => {
        return { ...prevState, courseName: value.value };
      });
    }
    if (isCourseCode) {
      const courseCodeExists =
        props.courseData.courses.filter((e) => e.courseCode === value.value)
          .length > 0;

      (courseCodeExists || !hasValue) && !props.editMode
        ? setErrorMessages((prevState) => {
            return {
              ...prevState,
              courseCode: courseCodeExists
                ? "KURSUS EKSISTEERIB"
                : "KOHUSTUSLIK",
            };
          })
        : setErrorMessages((prevState) => {
            return { ...prevState, courseCode: null };
          });
      setEnteredCourseData((prevState) => {
        return { ...prevState, courseCode: value.value };
      });
    }
  };

  const removeRowHandler = () => {
    props.onRemoveRow(index);
  };

  useEffect(() => {
    if (errorMessage.courseName === null && errorMessage.courseCode === null) {
      onChange(enteredCourseData, index, true);
      return;
    }
    onChange(enteredCourseData, index, false);
  }, [enteredCourseData, errorMessage]);

  return (
    <div className={classes.container}>
      {index === 0 && (
        <h1 className={classes.caption}>{`${
          props.editMode ? "KURSUSE MUUTMINE" : "UUE KURSUSE LISAMINE"
        }`}</h1>
      )}
      <div className={props.editMode ? classes.editMode : classes.inputRow}>
        <InputWithPlaceholder
          placeholder="Kursus"
          onChange={inputChangeHandler}
          name={"courseName"}
          value={props.values.courseName}
          errorMessage={errorMessage.courseName}
        />
        <InputWithPlaceholder
          placeholder="Lühend"
          onChange={inputChangeHandler}
          name={"courseCode"}
          value={props.values.courseCode}
          errorMessage={errorMessage.courseCode}
        />
        {index === 0 && !props.editMode && (
          <i
            onClick={props.onAddNewRow}
            className={`${classes.plusIcon} bi bi-plus`}
          ></i>
        )}
        {index > 0 && (
          <i
            onClick={removeRowHandler}
            className={`${classes.plusIcon} bi bi-x`}
          ></i>
        )}
      </div>
    </div>
  );
};

export default NewCourse;
