import { useCallback, useState } from "react";
import Select, { components } from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { isMobile } from "react-device-detect";

const SearchDropdown = (props) => {
  const [placeholderColor, setPlaceHolderColor] = useState("gray");
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

  const { DropdownIndicator } = components;

  const CustomDropdownIndicator = (props) => {
    const {
      selectProps: { menuIsOpen },
    } = props;
    return (
      <DropdownIndicator {...props}>
        {menuIsOpen ? (
          <FontAwesomeIcon icon={faAngleUp} className="px-1" />
        ) : (
          <FontAwesomeIcon icon={faAngleDown} className="px-1" />
        )}
      </DropdownIndicator>
    );
  };

  const mouseEnterHandler = () => {
    setPlaceHolderColor("black");
  };
  const mouseLeaveHandler = () => {
    setPlaceHolderColor("gray");
  };

  return (
    <div
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      className="relative group w-full"
    >
      {props.topLabel && <label>{props.topLabel}</label>}
      {!isMobile && window.innerWidth >= 1024 && (
        <div className="absolute bg-collegeGreen h-11 group-hover:animate-peeper" />
      )}
      <Select
        components={{ DropdownIndicator: CustomDropdownIndicator }}
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
            minHeight: "2.8rem",
            "&:hover": {
              border: "1px solid black",
              textColor: "black",
            },
          }),
          menu: (baseStyles, state) => ({
            ...baseStyles,
            border: "0.1rem solid #CECECE",
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 1px 2px 0px",
            position: "relative",
          }),
          container: (baseStyles, state) => ({
            ...baseStyles,
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 1px 2px 0px",
          }),
          placeholder: (baseStyles, state) => ({
            ...baseStyles,
            color: placeholderColor,
            marginLeft: "36px",
          }),
          indicatorsContainer: (baseStyles) => ({
            ...baseStyles,
            pointerEvents: "auto",
          }),
          option: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: state.isSelected
              ? "#E0E0E0"
              : state.isFocused
              ? "#E0E0E0"
              : "#fff",
            ":hover": {
              backgroundColor: state.isSelected ? "#E0E0E0" : "#E0E0E0",
              color: state.isSelected ? "#fff" : "#333",
            },
          }),
        }}
      />
    </div>
  );
};

export default SearchDropdown;
