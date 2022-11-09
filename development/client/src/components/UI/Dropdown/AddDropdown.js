import { useEffect, useState } from "react";
import Select from "react-select";
import classes from "./AddDropdown.module.css";

const AddDropdown = (props) => {
  const [valueCount, setValueCount] = useState();
  useEffect(() => {
    setValueCount(props.value);
  }, [props.value]);

  const changeHandler = (choice) => {
    if (choice.length === 0) setValueCount();
    let newArrayOfObj;
    if (props.isMulti) {
      newArrayOfObj = choice.map(({ value }) => ({
        [props.name + "Id"]: value,
      }));
    }
    if (!props.isMulti) {
      newArrayOfObj = [choice].map(({ value }) => ({
        [props.name + "Id"]: value,
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

  return (
    <div
      className={
        props.cssClass ? classes[props.cssClass] : classes.dropdownFilters
      }
    >
      {props.topLabel && <label>{props.topLabel}</label>}
      <Select
        placeholder={props.label}
        options={props.options}
        onChange={changeHandler}
        isMulti={props.isMulti ? true : false}
        isClearable={false}
        onInputChange={inputChangeHandler}
        noOptionsMessage={(value) => (value = "")}
        value={
          props.value === ""
            ? props.value
            : props.options.find(({ value }) => value === valueCount)
        }
      />
      {props.hasError && <div className={classes.errorHandling} />}
    </div>
  );
};

export default AddDropdown;
