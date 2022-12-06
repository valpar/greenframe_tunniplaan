import { useEffect, useState } from "react";
import TooltipLarge from "../Tooltip/TooltipLarge";
import classes from "./DropdownInput.module.css";
const DropdownInput = (props) => {
  const [options, setOptions] = useState();
  const [showTooltip, setShowTooltip] = useState(false);
  let timer;
  useEffect(() => {
    setOptions(props.options);
  }, []);

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
    props.onChange(event.target.value);
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
    <div
      className={
        props.hasError
          ? `${classes.container} ${classes.errorHandling}`
          : classes.container
      }
    >
      {props.index === 0 && <label>{props.label ? props.label : ""}</label>}
      {props.onErrorMessage !== "" && showTooltip && (
        <div
          className={
            props.index === 0 ? classes.tooltipFirstRow : classes.tooltip
          }
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
      />

      {props.showOptions && showOptions && options.length !== 0 && (
        <div
          className={
            props.index > 0
              ? `${classes.optionContainer} ${classes.nextRow}`
              : classes.optionContainer
          }
        >
          {options.map((e, i) => {
            return (
              <option key={i} value={e.value} onClick={optionClickHandler}>
                {e.label}
              </option>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DropdownInput;
