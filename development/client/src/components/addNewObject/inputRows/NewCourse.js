import { useEffect } from "react";
import { useState } from "react";
import InputWithPlaceholder from "../../UI/Input/InputWithPlaceholder";
import content from "../../../assets/content/content.json";

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

  const { courseExists, mandatoryField, courseShortExists } =
    content.errorMessages;

  useEffect(() => {
    if (props.editMode) {
      setEnteredCourseData(
        props.courseData.courses.filter((e) => {
          return e.id === props.editValues
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
              courseName: courseNameExists ? courseShortExists : mandatoryField,
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
              courseCode: courseCodeExists ? courseExists : mandatoryField,
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
    <div className="flex flex-col items-center mb-2">
      {index === 0 && (
        <h1 className="font-bold text-lg my-4">{`${
          props.editMode ? "KURSUSE MUUTMINE" : "UUE KURSUSE LISAMINE"
        }`}</h1>
      )}
      <div className="flex flex-col lg:flex-row space-x-0 space-y-4 lg:space-y-0 lg:space-x-4 w-full">
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
        {!props.editMode && (
          <div
            className={`hidden lg:flex justify-end items-center ${
              props.count > 1 ? "w-5/12" : "w-8"
            }`}
          >
            {index === props.count - 1 && (
              <i
                onClick={props.onAddNewRow}
                className={`bi bi-plus text-4xl`}
              ></i>
            )}
            {props.count > 1 && (
              <div>
                <i
                  onClick={removeRowHandler}
                  className={`bi bi-x text-4xl`}
                ></i>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewCourse;
