import { useState } from "react";
import TooltipLarge from "../Tooltip/TooltipLarge";
import TooltipTop from "../Tooltip/TooltipTop";
import classes from "./InputWithPlaceholder.module.css";

const addPrefix = (link) => {
  console.log(link?.includes("http://") || link?.includes("https://"));
  return link.length > 5
    ? link?.includes("http")
      ? link
      : "https://" + link
    : link;
};

const InputWithPlaceholder = (props) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const inputChangeHandler = (event) => {
    event.preventDefault();
    console.log(event.target.name);
    props.onChange({
      name: props.name,
      value:
        event.target.name === "distanceLink"
          ? addPrefix(event.target.value)
          : event.target.value,
    });
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
        props.hasError || props.errorMessage > ""
          ? `${classes.container} ${classes.errorHandling}`
          : classes.container
      }
    >
      {(props.hasError || (props.errorMessage > "" && showTooltip)) && (
        <div className={classes.tooltip}>
          <TooltipLarge message={props.errorMessage} />
        </div>
      )}

      <input
        onMouseEnter={mouseEnterHandler}
        onMouseLeave={mouseLeaveHandler}
        onBlur={inputChangeHandler}
        onClick={props.onClick}
        onChange={inputChangeHandler}
        type={props.type ? props.type : "text"}
        name={props.name ? props.name : ""}
        value={props.value ? props.value : ""}
        readOnly={props.readOnly ? true : false}
        className={props.hasError ? classes.errorHandling : ""}
        autoComplete="off"
        placeholder={props.placeholder}
        maxLength={props.maxLength}
      />
    </div>
  );
};

export default InputWithPlaceholder;
