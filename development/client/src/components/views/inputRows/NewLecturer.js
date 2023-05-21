import { useEffect } from "react";
import { useState } from "react";
import { InputOverlappingLabel } from "../../UI/Input/InputOverlappingLabel";
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
        return e.id === props.editValues
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
    <div className="flex flex-col items-center mb-2 lg:min-w-[41rem]">
      {index === 0 && (
        <h1 className="font-bold text-lg my-4">{`${
          props.editMode ? "ÕPPEJÕU MUUTMINE" : "UUE ÕPPEJÕU LISAMINE"
        }`}</h1>
      )}
      <div className="flex flex-col justify-center lg:flex-row space-x-0 space-y-4 lg:space-y-0 lg:space-x-4 w-full">
        <InputOverlappingLabel
          placeholder="Eesnimi"
          onChange={inputChangeHandler}
          name={"firstName"}
          value={props.values.firstName}
          errorMessage={errorMessage.firstName}
          eTopPos="true"
        />
        <InputOverlappingLabel
          placeholder="Perenimi"
          onChange={inputChangeHandler}
          name={"lastName"}
          value={props.values.lastName}
          errorMessage={errorMessage.lastName}
          eTopPos="true"
        />
        <InputOverlappingLabel
          placeholder="Email"
          onChange={inputChangeHandler}
          name={"email"}
          value={props.values.email}
          errorMessage={errorMessage.email}
          eTopPos="true"
        />
        {!props.editMode && (
          <div className={`hidden lg:flex justify-end items-center w-20`}>
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

export default NewLecturer;
