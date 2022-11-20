import { useState } from "react";
import TooltipTop from "../Tooltip/TooltipTop";
import TooltipLarge from "../Tooltip/TooltipLarge";
import classes from "./InputWithLabel.module.css";

const InputWithLabel = (props) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const inputChangeHandler = (event) => {
    event.preventDefault();
    props.onChange(event.target.value);
  };

  const mouseEnterHandler = () => {
    setShowTooltip(true);
  };
  const mouseLeaveHandler = () => {
    setShowTooltip(false);
  };

  return (
    <div
      className={
        props.hasError
          ? `${classes.container} ${classes.errorHandling}`
          : classes.container
      }
    >
      {props.index === 0 && <label>{props.label ? props.label : ""}</label>}
      {props.onErrorMessage !== "" && showTooltip && (
        <TooltipLarge index={props.index} message={props.onErrorMessage} />
      )}
      <input
        onMouseEnter={mouseEnterHandler}
        onMouseLeave={mouseLeaveHandler}
        onClick={props.onClick}
        onChange={inputChangeHandler}
        type={props.type ? props.type : "text"}
        name={props.name ? props.name : ""}
        value={props.value ? props.value : ""}
        readOnly={props.readOnly ? true : false}
        className={props.hasError ? classes.errorHandling : ""}
        autoComplete="off"
        placeholder={props.placeholder}
      />
    </div>
  );
};

export default InputWithLabel;
