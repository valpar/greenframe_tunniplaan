import { useEffect, useState } from "react";
import classes from "./DropdownInput.module.css";
const DropdownInput = (props) => {
  let timer;
  let options = props.options;
  if (props.value && props.value.length > 0) {
    options = options.filter((e) => !e.label.includes(props.value));
  }
  const [showOptions, setShowOptions] = useState(false);

  const inputChangeHandler = (event) => {
    event.preventDefault();
    props.onChange(event.target.value);
  };
  const showOptionsHandler = () => {
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

  return (
    <div
      className={
        props.hasError
          ? `${classes.container} ${classes.errorHandling}`
          : classes.container
      }
    >
      {props.index === 0 && <label>{props.label ? props.label : ""}</label>}
      <input
        onClick={showOptionsHandler}
        onChange={inputChangeHandler}
        type={props.type ? props.type : "text"}
        name={props.name ? props.name : ""}
        value={props.value ? props.value : ""}
        readOnly={props.readOnly ? true : false}
        onBlur={loseFocusHandler}
        autoComplete="off"
      />

      {showOptions && options.length !== 0 && (
        <div className={classes.optionContainer}>
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
