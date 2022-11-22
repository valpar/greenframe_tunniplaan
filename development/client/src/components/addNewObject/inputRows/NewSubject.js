import { useEffect } from "react";
import { useState } from "react";
import InputWithPlaceholder from "../../UI/Input/InputWithPlaceholder";
import classes from "./NewSubject.module.css";

const NewSubject = (props) => {
  const { onChange, index } = props;
  const [enteredSubjectData, setEnteredSubjectData] = useState({
    subject: "",
    subjectCode: "",
    creditPoint: "",
  });
  const [errorMessage, setErrorMessages] = useState({
    subject: "",
    subjectCode: "",
    creditPoint: "",
  });

  useEffect(() => {
    if (props.editMode) {
      setEnteredSubjectData(
        props.subjectsData.subjects.filter((e) => {
          return e.id === props.editValues
            ? {
                subject: e.subject,
                subjectCode: e.subjectCode,
                creditPoint: e.creditPoint,
              }
            : false;
        })[0]
      );
    }
    setErrorMessages({ subject: null, subjectCode: null, creditPoint: null });
  }, []);

  const inputChangeHandler = (value) => {
    const isSubject = value.name === "subject";
    const isSubjectCode = value.name === "subjectCode";
    const isCreditPoint = value.name === "creditPoint";
    const hasValue = value.value !== "";
    if (isSubject) {
      !hasValue
        ? setErrorMessages((prevState) => {
            return {
              ...prevState,
              subject: "KOHUSTUSLIK",
            };
          })
        : setErrorMessages((prevState) => {
            return { ...prevState, subject: null };
          });
      setEnteredSubjectData((prevState) => {
        return { ...prevState, subject: value.value };
      });
    }

    if (isSubjectCode) {
      const codeExists =
        props.subjectsData.subjects.filter((e) => e.subjectCode === value.value)
          .length > 0;
      (codeExists || !hasValue) && !props.editMode
        ? setErrorMessages((prevState) => {
            return {
              ...prevState,
              subjectCode: codeExists ? "KOOD EKSISTEERIB" : "KOHUSTUSLIK",
            };
          })
        : setErrorMessages((prevState) => {
            return { ...prevState, subjectCode: null };
          });
      setEnteredSubjectData((prevState) => {
        return { ...prevState, subjectCode: value.value };
      });
    }

    if (isCreditPoint) {
      if (!value.value.match(/^([1-9][0-9]{0,1})$/)) {
        setErrorMessages((prevState) => {
          return {
            ...prevState,
            creditPoint: "MAHT NUMBRITES",
          };
        });
      } else {
        setErrorMessages((prevState) => {
          return { ...prevState, creditPoint: null };
        });
      }
      setEnteredSubjectData((prevState) => {
        return { ...prevState, creditPoint: value.value };
      });
    }
  };

  const removeRowHandler = () => {
    props.onRemoveRow(index);
  };

  useEffect(() => {
    if (
      errorMessage.subject === null &&
      errorMessage.subjectCode === null &&
      errorMessage.creditPoint === null
    ) {
      onChange(enteredSubjectData, index, true);
      return;
    }
    onChange(enteredSubjectData, index, false);
  }, [enteredSubjectData, errorMessage]);
  return (
    <div className={classes.container}>
      {index === 0 && (
        <h1 className={classes.caption}>{`${
          props.editMode ? "ÕPPEAINE MUUTMINE" : "UUE ÕPPEAINE LISAMINE"
        }`}</h1>
      )}
      <div className={classes.inputRow}>
        <InputWithPlaceholder
          placeholder="Õppeaine"
          onChange={inputChangeHandler}
          name={"subject"}
          value={props.values.subject}
          errorMessage={errorMessage.subject}
        />
        <InputWithPlaceholder
          placeholder="Ainekood"
          onChange={inputChangeHandler}
          name={"subjectCode"}
          value={props.values.subjectCode}
          errorMessage={errorMessage.subjectCode}
        />
        <InputWithPlaceholder
          placeholder="EAP"
          onChange={inputChangeHandler}
          name={"creditPoint"}
          value={props.values.creditPoint}
          errorMessage={errorMessage.creditPoint}
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

export default NewSubject;
