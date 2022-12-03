import { useCallback } from "react";
import Select, { CommonProps } from "react-select";
import classes from "./SearchDropdown.module.css";

const SearchDropdown = (props) => {
  const changeHandler = (choice) => {
    let newArrayOfObj;
    if (props.isMulti) {
      newArrayOfObj = choice.map(({ value }) => ({
        [props.name]: value.trim(),
      }));
    }
    if (!props.isMulti) {
      newArrayOfObj = [choice].map(({ value }) => ({
        [props.name]: value.trim(),
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
  const refChangeHandler = useCallback(
    (ref) => {
      if (props.reset && ref) {
        ref.clearValue();
      }
    },
    [props.reset]
  );
  return (
    <div
      className={
        props.cssClass ? classes[props.cssClass] : classes.dropdownFilters
      }
    >
      {props.topLabel && <label>{props.topLabel}</label>}
      <div className={classes.btnHover} />
      <Select
        ref={refChangeHandler}
        value={props?.reset ? "" : undefined}
        placeholder={props.label}
        options={props.options}
        onChange={changeHandler}
        isMulti={props.isMulti ? true : false}
        onInputChange={inputChangeHandler}
        noOptionsMessage={(value) => (value = "")}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            borderRadius: "none",
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 1px 2px 0px",
          }),
          menu: (baseStyles, state) => ({
            ...baseStyles,
            border: "0.1rem solid #CECECE",
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 1px 2px 0px",
          }),
          container: (baseStyles, state) => ({
            ...baseStyles,
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 1px 2px 0px",
          }),
        }}
      />
    </div>
  );
};

export default SearchDropdown;
