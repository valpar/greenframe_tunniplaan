import { useEffect, useState } from "react";
import TooltipLarge from "../Tooltip/TooltipLarge";

const DropdownOverlappingInput = (props) => {
  const [options, setOptions] = useState();
  const [showTooltip, setShowTooltip] = useState(false);
  let timer;
  useEffect(() => {
    setOptions(props.options);
  }, []);

  const { isTabletOrMobile } = props;

  const [showOptions, setShowOptions] = useState(false);

  const inputChangeHandler = (event) => {
    event.preventDefault();
    setOptions(
      props.options.filter((e) => e.label.includes(event.target.value))
    );
    props.onChange(event.target.value);
  };
  const showOptionsHandler = () => {
    if (props.showOptions)
      setShowOptions((prevState) => (prevState = !prevState));
  };
  const optionClickHandler = (event) => {
    event.preventDefault();
    props.onChange({
      id: props.index,
      value: event.target.innerText,
    });
    setShowOptions((prevState) => (prevState = !prevState));
  };
  const loseFocusHandler = () => {
    timer = setTimeout(() => {
      setShowOptions((prevState) => (prevState = false));
    }, 200);
  };

  useEffect(() => {
    return () => clearTimeout(timer);
  }, []);

  const mouseEnterHandler = () => {
    setShowTooltip(true);
  };
  const mouseLeaveHandler = () => {
    setShowTooltip(false);
  };

  return (
    <div className="relative flex flex-col">
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
        onClick={showOptionsHandler}
        placeholder={props.placeholder}
        onChange={inputChangeHandler}
        type={props.type ? props.type : "text"}
        name={props.name ? props.name : ""}
        value={props.value ? props.value : ""}
        readOnly={props.readOnly ? true : false}
        onBlur={loseFocusHandler}
        autoComplete="off"
        className={`p-2 border w-full ${
          props.hasError || props.errorMessage
            ? "border-red-500"
            : "border-borderGray "
        } rounded-none font-normal focus:outline-none focus:border-black`}
      />

      {props.showOptions && showOptions && options.length !== 0 && (
        <div className="absolute top-12 w-full bg-white border border-black/50 shadow z-20">
          {options.map((e, i) => {
            return (
              <div
                key={i}
                value={e.value}
                onClick={optionClickHandler}
                className="p-2 hover:bg-sky-100 duration-150"
              >
                {e.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DropdownOverlappingInput;
