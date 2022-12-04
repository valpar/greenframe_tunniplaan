import { useEffect } from "react";
import { useState } from "react";
import InputWithPlaceholder from "../../UI/Input/InputWithPlaceholder";
import classes from "./NewLecturer.module.css";
import content from "../../../assets/content/content.json";

const NewLecturer = (props) => {
  const { onChange, index } = props;
  const [enteredLecturerData, setEnteredLecturerData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [errorMessage, setErrorMessages] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const { mandatoryField, brokenEmail, lecturerExists } = content.errorMessages;

  useEffect(() => {
    if (props.editMode) {
      const lecturerData = props.lecturerData.lecturers.filter((e) => {
        let arr = props.editValues.filter(
          (lecturer) => lecturer.lecturerId === e.id
        );
        return arr.length !== 0
          ? { firstName: e.firstName, lastName: e.lastName, email: e.email }
          : false;
      })[0];
      setEnteredLecturerData(lecturerData);
      if (!lecturerData.email) {
        return setErrorMessages({
          firstName: null,
          lastName: null,
          email: mandatoryField,
        });
      }
    }
    setErrorMessages({
      firstName: null,
      lastName: null,
      email: null,
    });
  }, []);

  const inputChangeHandler = (value) => {
    const isFirstName = value.name === "firstName";
    const isLastName = value.name === "lastName";
    const isEmail = value.name === "email";
    const hasValue = value.value !== "";
    if (isFirstName) {
      !hasValue
        ? setErrorMessages((prevState) => {
            return {
              ...prevState,
              firstName: mandatoryField,
            };
          })
        : setErrorMessages((prevState) => {
            return { ...prevState, firstName: null };
          });
      setEnteredLecturerData((prevState) => {
        return { ...prevState, firstName: value.value };
      });
    }
    if (isLastName) {
      !hasValue
        ? setErrorMessages((prevState) => {
            return {
              ...prevState,
              lastName: mandatoryField,
            };
          })
        : setErrorMessages((prevState) => {
            return { ...prevState, lastName: null };
          });
      setEnteredLecturerData((prevState) => {
        return { ...prevState, lastName: value.value };
      });
    }

    if (isEmail) {
      const isEmalilVaild = value.value.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      );
      const emailExists =
        props.lecturerData.lecturers.filter((e) => e.email === value.value)
          .length > 0;
      setEnteredLecturerData((prevState) => {
        return { ...prevState, email: value.value };
      });

      if (hasValue && !props.editMode) {
        const timer = setTimeout(() => {
          emailExists || !isEmalilVaild
            ? setErrorMessages((prevState) => {
                return {
                  ...prevState,
                  email: emailExists ? lecturerExists : brokenEmail,
                };
              })
            : setErrorMessages((prevState) => {
                return { ...prevState, email: null };
              });
        }, 2000);
        return () => clearTimeout(timer);
      }
      if (props.editMode) {
        const timer = setTimeout(() => {
          !isEmalilVaild
            ? setErrorMessages((prevState) => {
                return {
                  ...prevState,
                  email: brokenEmail,
                };
              })
            : setErrorMessages((prevState) => {
                return { ...prevState, email: null };
              });
        }, 2000);
        return () => clearTimeout(timer);
      } else {
        setErrorMessages((prevState) => {
          return {
            ...prevState,
            email: mandatoryField,
          };
        });
      }
    }
  };

  const removeRowHandler = () => {
    props.onRemoveRow(index);
  };

  useEffect(() => {
    if (
      errorMessage.firstName === null &&
      errorMessage.lastName === null &&
      errorMessage.email === null
    ) {
      onChange(enteredLecturerData, index, true);
      return;
    }
    onChange(enteredLecturerData, index, false);
  }, [enteredLecturerData, errorMessage]);
  return (
    <div className={classes.container}>
      {index === 0 && (
        <h1 className={classes.caption}>{`${
          props.editMode ? "ÕPPEJÕU MUUTMINE" : "UUE ÕPPEJÕU LISAMINE"
        }`}</h1>
      )}
      <div className={props.editMode ? classes.editMode : classes.inputRow}>
        <InputWithPlaceholder
          placeholder="Eesnimi"
          onChange={inputChangeHandler}
          name={"firstName"}
          value={props.values.firstName}
          errorMessage={errorMessage.firstName}
        />
        <InputWithPlaceholder
          placeholder="Perenimi"
          onChange={inputChangeHandler}
          name={"lastName"}
          value={props.values.lastName}
          errorMessage={errorMessage.lastName}
        />
        <InputWithPlaceholder
          placeholder="Email"
          onChange={inputChangeHandler}
          name={"email"}
          value={props.values.email}
          errorMessage={errorMessage.email}
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

export default NewLecturer;
