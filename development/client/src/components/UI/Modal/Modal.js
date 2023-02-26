import { Fragment } from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

const Backdrop = (props) => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-screen z-20 bg-neutral-900 opacity-70"
      onClick={props.onClose}
    />
  );
};

const ModalOverlay = (props) => {
  return (
    <div className="fixed top-20 w-11/12 lg:w-auto h-auto left-1/2 -translate-x-1/2 bg-white rounded z-30 shadow-lg animate-slideDown lg:top-1/4">
      <div
        className={`absolute ${
          props.modalOverlay ? "flex" : "hidden"
        } justify-center items-center w-full h-full bg-neutral-900 opacity-70 z-30`}
      ></div>
      <div className="p-4 ">
        <div className={classes.content}>{props.children}</div>
      </div>
    </div>
  );
};
const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay modalOverlay={props.overlay}>
          {props.children}
        </ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
