import { useState, useRef } from "react";
import classes from "./AddHomework.module.css";
import InputWithPlaceholder from "../UI/Input/InputWithPlaceholder";
import CalendarOneInput from "../UI/Calendar/CalendarOneInput";
import useAutosizeTextArea from "../../hooks/useAutosizeTextArea";
import TooltipTop from "../UI/Tooltip/TooltipTop";
import ConfirmModal from "../UI/ConfirmModal/ConfirmModal";

const AddHomework = (props) => {
  const [dateValue, setDateValue] = useState();
  const [showCalendar, setShowCalendar] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showCofirmationModal, setShowConfirmationModal] = useState(false);
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
    if (event.target) {
      event.preventDefault();
    }
    if (!event.target && !event.name) {
      setShowCalendar((prevState) => (prevState = !prevState));
      setDateValue(event);
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
    props.onRemoveRow(props.index);
  };

  const declineHandler = () => {
    setShowConfirmationModal(false);
  };

  useAutosizeTextArea(textAreaRef.current, props.homeworkData.description);

  return (
    <div
      className={
        props.index > 0
          ? `${classes.homeworkAdd} ${classes.afterFirstRow}`
          : classes.homeworkAdd
      }
    >
      <div className={classes.homeworkTextare}>
        {showTooltip && !props.onErrors.descriptionValid.description && (
          <TooltipTop
            errorMessage={props.onErrors.descriptionValid.errorMessage}
          />
        )}
        <textarea
          className={
            props.onErrors.descriptionValid.description
              ? ""
              : classes.textareaError
          }
          onMouseEnter={mouseEnterHandler}
          onMouseLeave={mouseLeaveHandler}
          placeholder="Kodutöö kirjeldus..."
          onChange={changeHandler}
          maxLength={2500}
          ref={textAreaRef}
          value={props.homeworkData.description}
          name="description"
        />
        <i
          onClick={props.onAddRow}
          className={`bi bi-plus-lg ${classes.addIcon}`}
        ></i>
        {props.index > 0 && (
          <>
            {showCofirmationModal && (
              <ConfirmModal
                modalMessage="Kas soovid rea kustudada?"
                onConfirm={confirmationHandler}
                onDecline={declineHandler}
              />
            )}
            <i
              onClick={removeRowHandler}
              className={`bi bi-x-lg ${classes.removeIcon}`}
            ></i>
          </>
        )}
      </div>
      <div className={classes.homeworkExtra}>
        <CalendarOneInput
          onClickDay={changeHandler}
          onShowCalendar={showCalendar}
          onClick={addDateHandler}
          value={props.homeworkData.dueDate}
          placeholder="Tähtaeg"
          index="1"
          name="dueDate"
          errorMessage={props.onErrors.dueDateValid.errorMessage}
          hasError={!props.onErrors.dueDateValid.dueDate}
        />
        {dateValue && (
          <i
            id="removeDate"
            onClick={removeDateHandler}
            className={`bi bi-x-lg ${classes.removeDateIcon}`}
          ></i>
        )}
        <InputWithPlaceholder
          onChange={changeHandler}
          placeholder="Link lisa materjalidele"
          name="extraLink"
          value={props.homeworkData.extrasLink}
          errorMessage={props.onErrors.extrasLinkValid.errorMessage}
          hasErrors={props.onErrors.extrasLinkValid.extrasLink}
        />
      </div>
    </div>
  );
};

export default AddHomework;
