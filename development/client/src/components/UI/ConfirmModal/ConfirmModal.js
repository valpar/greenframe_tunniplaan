import classes from "./ConfirmModal.module.css";

const ConfirmModal = (props) => {
  let arrow = classes.leftArrow;
  if (props.topArrow) arrow = classes.topArrow;
  if (props.bottomArrow) arrow = classes.bottomArrow;
  return (
    <div className={classes.container}>
      <div className={arrow}></div>
      <div className={classes.message}>
        <p>{props.modalMessage}</p>
      </div>
      <div className={classes.buttonRow}>
        <button onClick={props.onDecline} type="button">
          EI
        </button>
        <button onClick={props.onConfirm} type="button">
          JAH
        </button>
      </div>
    </div>
  );
};

export default ConfirmModal;
