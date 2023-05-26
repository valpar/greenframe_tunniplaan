import { useEffect, useState } from "react";
import TooltipLarge from "../Tooltip/TooltipLarge";
const DropdownInput = (props) => {
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
    props.onChange(event.target.innerText);
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
    <div className="relative w-full flex flex-col">
      {(props.index === 0 || isTabletOrMobile) && (
        <label className="font-bold text-left pb-1 lg:pb-2">
          {props.label ? props.label : ""}
        </label>
      )}
      {props.onErrorMessage !== "" && showTooltip && (
        <div
          className={`absolute left-1/2 -translate-x-1/2 bottom-14 w-full lg:w-52 max-w-xs`}
        >
          <TooltipLarge index={props.index} message={props.onErrorMessage} />
        </div>
      )}
      <input
        onMouseEnter={mouseEnterHandler}
        onMouseLeave={mouseLeaveHandler}
        onClick={showOptionsHandler}
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
        <div className="absolute top-20 w-full bg-white border border-black/50 shadow z-20">
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

export default DropdownInput;
