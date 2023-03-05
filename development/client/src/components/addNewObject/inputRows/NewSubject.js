import { useEffect } from "react";
import { useState } from "react";
import InputWithPlaceholder from "../../UI/Input/InputWithPlaceholder";
import content from "../../../assets/content/content.json";

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

  const { subjectCodeExists, mandatoryField, workLoadMessage } =
    content.errorMessages;

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
              subject: mandatoryField,
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
              subjectCode: codeExists ? subjectCodeExists : mandatoryField,
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
            creditPoint: workLoadMessage,
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
    <div className="flex flex-col items-center mb-2">
      {index === 0 && (
        <h1 className="font-bold text-lg my-4">{`${
          props.editMode ? "ÕPPEAINE MUUTMINE" : "UUE ÕPPEAINE LISAMINE"
        }`}</h1>
      )}
      <div className="flex flex-col lg:flex-row space-x-0 space-y-4 lg:space-y-0 lg:space-x-4 w-full">
        <InputWithPlaceholder
          placeholder="Õppeaine"
          onChange={inputChangeHandler}
          name={"subject"}
          value={props.values.subject}
          errorMessage={errorMessage.subject}
          eTopPos="true"
        />
        <InputWithPlaceholder
          placeholder="Ainekood"
          onChange={inputChangeHandler}
          name={"subjectCode"}
          value={props.values.subjectCode}
          errorMessage={errorMessage.subjectCode}
          eTopPos="true"
        />
        <InputWithPlaceholder
          placeholder="EAP"
          onChange={inputChangeHandler}
          name={"creditPoint"}
          value={props.values.creditPoint}
          errorMessage={errorMessage.creditPoint}
          eTopPos="true"
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

export default NewSubject;
