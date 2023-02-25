import { useState } from "react";
import TooltipLarge from "../Tooltip/TooltipLarge";

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
    <div className="relative flex flex-col w-full">
      {props.index === 0 && <label>{props.label ? props.label : ""}</label>}
      {props.onErrorMessage !== "" && showTooltip && (
        <div className="absolute left-1/2 -translate-x-1/2 -top-16 lg:-top-24">
          <TooltipLarge index={props.index} message={props.onErrorMessage} />
        </div>
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
        className={`p-2 border ${
          props.hasError || props.errorMessage
            ? "border-red-500"
            : "border-borderGray "
        } rounded-none font-normal focus:outline-none focus:border-black`}
        autoComplete="off"
        placeholder={props.placeholder}
      />
    </div>
  );
};

export default InputWithLabel;
