import { useState, useRef } from "react";
import classes from "./AddHomework.module.css";
import InputWithPlaceholder from "../UI/Input/InputWithPlaceholder";
import CalendarOneInput from "../UI/Calendar/CalendarOneInput";
import useAutosizeTextArea from "../../hooks/useAutosizeTextArea";
import ConfirmModal from "../UI/ConfirmModal/ConfirmModal";
import { formatMilliseconds } from "../../utils/Format/Date";
import TooltipLarge from "../UI/Tooltip/TooltipLarge";
import content from "../../assets/content/content.json";

const addPrefix = (link) => {
  console.log(link?.includes("http://") || link?.includes("https://"));
  return link.length > 5
    ? link?.includes("http")
      ? link
      : "https://" + link
    : link;
};

const AddHomework = (props) => {
  const [dateValue, setDateValue] = useState();
  const [showCalendar, setShowCalendar] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showCofirmationModal, setShowConfirmationModal] = useState(false);

  const { homeworkContent, deadline, studyMaterials } =
    content.lectureInformation;
  const { deleteRowMessage } = content.confirmModalMessages;

  const addDateHandler = (event) => {
    event.preventDefault();
    setDateValue(new Date());
    setShowCalendar((prevState) => (prevState = !prevState));
  };
  const textAreaRef = useRef(null);

  const mouseEnterHandler = () => {
    setShowTooltip(true);
  };
  const mouseLeaveHandler = () => {
    setShowTooltip(false);
  };

  const changeHandler = (event) => {
    if (event?.target) {
      event.preventDefault();
    }
    if (event?.name === "extraLink") {
      return props.onChange(
        { ...event, value: addPrefix(event.value) },
        props.index
      );
    }
    if (!event?.target && !event?.name) {
      if (event) {
        setShowCalendar(false);
        setDateValue(event);
      } else {
        setDateValue(undefined);
      }
    }
    props.onChange(event, props.index);
  };

  const removeDateHandler = (event) => {
    event.preventDefault();
    setShowCalendar((prevState) => (prevState = false));
    setDateValue("");
    props.onChange(event, props.index);
  };
  const removeRowHandler = () => {
    setShowConfirmationModal(true);
  };

  const confirmationHandler = () => {
    setShowConfirmationModal(false);
    props.onRemoveRow(props.index, props.homeworkData.id);
  };

  const declineHandler = () => {
    setShowConfirmationModal(false);
  };

  useAutosizeTextArea(textAreaRef.current, props.homeworkData.description);
  let date;
  if (props.homeworkData.dueDate !== "") {
    date = new Date(formatMilliseconds(props.homeworkData.dueDate));
  }

  return (
    <div
      className={
        props.index > 0
          ? `${classes.homeworkAdd} ${classes.afterFirstRow}`
          : classes.homeworkAdd
      }
    >
      <div className={classes.homeworkTextarea}>
        {showTooltip && !props.onErrors?.descriptionValid.description && (
          <div className={classes.descriptionErrorMessage}>
            <TooltipLarge
              message={props.onErrors?.descriptionValid.errorMessage}
            />
          </div>
        )}
        <textarea
          className={
            props.onErrors?.descriptionValid.description
              ? ""
              : classes.textareaError
          }
          onMouseEnter={mouseEnterHandler}
          onMouseLeave={mouseLeaveHandler}
          placeholder={homeworkContent.placeholder}
          onChange={changeHandler}
          maxLength={2500}
          ref={textAreaRef}
          value={props.homeworkData.description}
          name="description"
        />
        <div className={classes.iconRow}>
          {props.index === props.arrayLength - 1 && (
            <i
              onClick={props.onAddRow}
              className={`bi bi-plus-lg ${classes.addIcon}`}
            ></i>
          )}
          {
            <>
              {showCofirmationModal && (
                <div className={classes.deleteConfirmation}>
                  <ConfirmModal
                    modalMessage={deleteRowMessage}
                    onConfirm={confirmationHandler}
                    onDecline={declineHandler}
                    homework={true}
                  />
                </div>
              )}
              <i
                onClick={removeRowHandler}
                className={`bi bi-x-lg ${classes.removeIcon}`}
              ></i>
            </>
          }
        </div>
      </div>
      <div className={classes.homeworkExtra}>
        <div className={classes.calendar}>
          <CalendarOneInput
            onClickDay={changeHandler}
            onShowCalendar={showCalendar}
            onClick={addDateHandler}
            value={props.homeworkData.dueDate ? date : ""}
            placeholder={deadline.placeholder}
            index="1"
            name="dueDate"
            errorMessage={props.onErrors?.dueDateValid.errorMessage}
            hasError={!props.onErrors?.dueDateValid.dueDate}
          />
        </div>
        {dateValue && (
          <i
            id="removeDate"
            onClick={removeDateHandler}
            className={`bi bi-x-lg ${classes.removeDateIcon}`}
          ></i>
        )}
        <div className={classes.extrasLink}>
          <InputWithPlaceholder
            onChange={changeHandler}
            placeholder={studyMaterials.placeholder}
            name="extraLink"
            value={props.homeworkData.extrasLink}
            errorMessage={props.onErrors?.extrasLinkValid.errorMessage}
            hasErrors={props.onErrors?.extrasLinkValid.extrasLink}
          />
        </div>
      </div>
    </div>
  );
};

export default AddHomework;
