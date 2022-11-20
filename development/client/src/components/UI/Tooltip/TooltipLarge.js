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
      <div className={classes.containerBackground}></div>
      <div className={classes.bottomArrow}></div>
      <div className={classes.textContainer}>
        <div>
          <p>{props.message}</p>
        </div>
      </div>
    </div>
  );
};

export default TooltipLarge;
