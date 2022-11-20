import classes from "./Input.module.css";

const Input = (props) => {
  const inputChangeHandler = (event) => {
    event.preventDefault();
    props.onChange({ name: props.name, value: event.target.value });
  };

  return (
    <input
      className={classes.container}
      onBlur={inputChangeHandler}
      onClick={props.onClick}
      onChange={inputChangeHandler}
      type={props.type ? props.type : "text"}
      name={props.name ? props.name : ""}
      value={props.value ? props.value : ""}
      readOnly={props.readOnly ? true : false}
      autoComplete="off"
      placeholder={props.placeholder}
    />
  );
};

export default Input;
