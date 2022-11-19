import { useEffect, useState } from "react";
import Select from "react-select";
import classes from "./AddDropdown.module.css";
import TooltipLarge from "../Tooltip/TooltipLarge";
import ConfirmModal from "../ConfirmModal/ConfirmModal";

const AddDropdown = (props) => {
  const [valueCount, setValueCount] = useState();
  const [showTooltip, setShowTooltip] = useState(false);
  useEffect(() => {
    setValueCount(props.value);
  }, [props.value]);

  const changeHandler = (choice) => {
    if (choice.length === 0) setValueCount();
    let newArrayOfObj;
    if (props.isMulti) {
      newArrayOfObj = choice.map(({ value }) => ({
        [props.name + "Id"]: value,
      }));
    }
    if (!props.isMulti) {
      newArrayOfObj = [choice].map(({ value }) => ({
        [props.name + "Id"]: value,
      }));
    }

    if (newArrayOfObj.length > 0) {
      props.onChange(newArrayOfObj);
    } else {
      props.onChange([{ value: props.name }]);
    }
  };

  const inputChangeHandler = (e) => {
    if (props.onInputChange) {
      props.onInputChange(e);
    }
  };

  const mouseEnterHandler = () => {
    setShowTooltip(true);
  };
  const mouseLeaveHandler = () => {
    setShowTooltip(false);
  };
  console.log(props.onErrorMessage);
  console.log(showTooltip);
  return (
    <div
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      className={
        props.cssClass ? classes[props.cssClass] : classes.dropdownFilters
      }
    >
      {props.topLabel && <label>{props.topLabel}</label>}
      {props.onErrorMessage && props.onErrorMessage !== "" && showTooltip && (
        <div className={classes.tooltip}>
          <TooltipLarge index={props.index} message={props.onErrorMessage} />
        </div>
      )}
      <Select
        placeholder={props.label}
        options={props.options}
        onChange={changeHandler}
        isMulti={props.isMulti ? true : false}
        isClearable={false}
        onInputChange={inputChangeHandler}
        noOptionsMessage={(value) => (value = "")}
        value={
          props.value === ""
            ? props.value
            : props.options.find(({ value }) => value === valueCount)
        }
      />
      {props.modalMessage?.show && (
        <div className={classes.confirmModal}>
          <ConfirmModal
            modalMessage={props.modalMessage?.message}
            topArrow={true}
          />
        </div>
      )}
      {props.hasError && <div className={classes.errorHandling} />}
    </div>
  );
};

export default AddDropdown;
