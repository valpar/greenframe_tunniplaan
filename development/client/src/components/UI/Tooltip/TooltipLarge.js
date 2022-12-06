import classes from "./TooltipLarge.module.css";
const TooltipLarge = (props) => {
  const { direction, type } = props;
  return (
    <div
      className={
        props.index > 0
          ? `${classes.container} ${classes.nextRow}`
          : classes.container
      }
    >
      <div className={classes.containerBackground}>
        <p>{props.message}</p>
      </div>
      <div className={classes.bottomArrow}></div>
    </div>
  );
};

export default TooltipLarge;
