import classes from "./ConfirmModal.module.css";

const ConfirmModal = (props) => {
  return (
    <div className={classes.container}>
      <div className={classes.leftArrow}></div>
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
