import { useState } from "react";
import TooltipLarge from "../Tooltip/TooltipLarge";

const addPrefix = (link) => {
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
    <div className="relative flex flex-col w-full">
      {(props.hasError || (props.errorMessage > "" && showTooltip)) && (
        <div
          className={`absolute left-1/2 -translate-x-1/2 ${
            props.eTopPos ? "-top-16 lg:-top-24" : "-top-16"
          }`}
        >
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
        className={`p-2 border ${
          props.hasError || props.errorMessage
            ? "border-red-500"
            : "border-borderGray "
        } rounded-none font-normal focus:outline-none focus:border-black`}
        autoComplete="off"
        placeholder={props.placeholder}
        maxLength={props.maxLength}
      />
    </div>
  );
};

export default InputWithPlaceholder;
