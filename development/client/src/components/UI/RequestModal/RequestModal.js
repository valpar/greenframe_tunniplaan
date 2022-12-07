import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import classes from "./RequestModal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

const RequestModalOverlay = (props) => {
  const style = props.loading
    ? classes.loadingContainer
    : props.success
    ? classes.successContainer
    : classes.container;

  return (
    <div className={style}>
      {props.loading && (
        <div className={classes.spinnerContainer}>
          <div
            className={`spinner-border ${classes.spinner}`}
            role="status"
          ></div>
        </div>
      )}
      {!props.loading && (
        <div className={classes.message}>
          <p>{props.modalMessage}</p>
        </div>
      )}
      {props.success && (
        <>
          <div className={classes.successIcon}>
            <FontAwesomeIcon icon={faThumbsUp} />
          </div>
          <div className={classes.progress}>
            <div className={classes.progressValue}></div>
          </div>
        </>
      )}

      {props.error && (
        <>
          <div className={classes.exclamationIcon}>
            <FontAwesomeIcon icon={faExclamation} />
          </div>

          <div className={classes.buttonRow}>
            <button onClick={props.onDecline} type="button">
              KATKESTA
            </button>
            <button onClick={props.onConfirm} type="button">
              UUESTI
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const RequestModal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop />, portalElement)}
      {ReactDOM.createPortal(<RequestModalOverlay {...props} />, portalElement)}
    </Fragment>
  );
};

export default RequestModal;
