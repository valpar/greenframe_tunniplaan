import { useCallback, useState } from "react";
import Select, { components } from "react-select";
import classes from "./SearchDropdown.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

const SearchDropdown = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        {!isMenuOpen && (
          <FontAwesomeIcon icon={faAngleDown} className={classes.arrowIcon} />
        )}
        {isMenuOpen && (
          <FontAwesomeIcon icon={faAngleUp} className={classes.arrowIcon} />
        )}
      </components.DropdownIndicator>
    );
  };

  const menuOpenHandler = () => {
    setIsMenuOpen(true);
  };
  const menuCloseHandler = () => {
    setIsMenuOpen(false);
  };

  return (
    <div
      className={
        props.cssClass ? classes[props.cssClass] : classes.dropdownFilters
      }
    >
      {props.topLabel && <label>{props.topLabel}</label>}
      <div className={classes.btnHover} />
      <Select
        onMenuClose={menuCloseHandler}
        onMenuOpen={menuOpenHandler}
        components={{ DropdownIndicator }}
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
