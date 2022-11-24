import Select, { NonceProvider } from "react-select";
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
console.log(props?.reset)
  return (
    <div
      className={
        props.cssClass ? classes[props.cssClass] : classes.dropdownFilters
      }
    >
      {props.topLabel && <label>{props.topLabel}</label>}
      <Select
        value={props?.reset?"":undefined}
        placeholder={props.label}
        options={props.options}
        onChange={changeHandler}
        isMulti={props.isMulti ? true : false}
        onInputChange={inputChangeHandler}
        noOptionsMessage={(value) => (value = "")}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            border: "none",
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
          }),
          menu: (baseStyles, state) => ({
            ...baseStyles,
            border: "none",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }),
          container: (baseStyles, state) => ({
            ...baseStyles,
            border: "none",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }),
        }}
      />
    </div>
  );
};

export default SearchDropdown;
