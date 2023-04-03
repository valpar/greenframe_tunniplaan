import React, { useState } from "react";
import TooltipLarge from "../Tooltip/TooltipLarge";

const addPrefix = (link) => {
  return link.length > 5
    ? link?.includes("http")
      ? link
      : "https://" + link
    : link;
};

export const InputOverlappingLabel = (props) => {
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
    <div className="relative">
      {(props.hasError || (props.errorMessage > "" && showTooltip)) && (
        <div
          className={`absolute left-1/2 -translate-x-1/2 bottom-14 w-full max-w-xs`}
        >
          <TooltipLarge message={props.errorMessage} />
        </div>
      )}
      <label
        htmlFor="input"
        className={`absolute left-0 ml-2 text-xs -top-2 ${
          props.value
            ? "text-gray-500 bg-white px-1"
            : "text-gray-400 bg-transparent"
        } duration-200`}
      >
        {props.value ? props.placeholder : ""}
      </label>
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
        } w-full rounded-none font-normal focus:outline-none focus:border-black`}
        autoComplete="off"
        placeholder={props.placeholder}
        maxLength={props.maxLength}
      />
    </div>
  );
};
