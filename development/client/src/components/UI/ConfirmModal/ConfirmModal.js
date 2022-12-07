import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import classes from "./ConfirmModal.module.css";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

const ConfirmModalOverlay = (props) => {
  let arrow = classes.leftArrow;
  if (props.topArrow) arrow = classes.topArrow;
  if (props.bottomArrow) arrow = classes.bottomArrow;

  return (
    <div
      className={props.homework ? classes.homeworkContainer : classes.container}
    >
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

const portalElement = document.getElementById("overlays");

const ConfirmModal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop />, portalElement)}
      <ConfirmModalOverlay {...props} />
    </Fragment>
  );
};

export default ConfirmModal;
