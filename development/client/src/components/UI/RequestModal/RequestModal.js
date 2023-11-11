import React, { Fragment, useEffect } from "react";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import { Spinner } from "../Spinner";

const Backdrop = (props) => {
  useEffect(() => {
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');

    themeColorMeta.setAttribute("content", "#5C5C5C");

    return () => {
      themeColorMeta.setAttribute("content", "#fff");
    };
  }, []);

  return (
    <div
      data-testid="backdrop"
      className="fixed top-0 left-0 w-full h-screen z-20 bg-neutral-900 opacity-70"
      onClick={props.onClose}
    />
  );
};

const RequestModalOverlay = (props) => {
  return (
    <div
      data-testid="modal-overlay"
      className={`fixed top-1/3 lg:top-1/4 w-11/12 lg:w-96 h-auto left-1/2 -translate-x-1/2 bg-white rounded z-40 shadow-lg animate-slideDown ${props.customStyle}`}
    >
      {props.loading && <Spinner containerStyle="p-12" />}
      {!props.loading && (
        <div className="flex justify-center px-8 pt-8 pb-4 text-xl">
          <p>{props.modalMessage}</p>
        </div>
      )}
      {props.success && (
        <>
          <div className=" flex justify-center text-collegeGreen text-5xl py-2">
            <FontAwesomeIcon icon={faThumbsUp} />
          </div>
          <div className="w-full h-8">
            <div className="h-1 w-0 bg-collegeGreen animate-greenLoader"></div>
          </div>
        </>
      )}

      {props.error && (
        <>
          <div className="flex justify-center pb-4 text-4xl lg:text-6xl text-collegeRed">
            <FontAwesomeIcon icon={faExclamation} />
          </div>
          <div className="flex justify-between px-4 pb-4">
            <button
              onClick={props.onDecline}
              type="button"
              className="px-4 py-2 w-28 border border-borderGray text-sm shadow hover:bg-borderGray hover:shadow-lg duration-150"
            >
              KATKESTA
            </button>
            <button
              onClick={props.onConfirm}
              type="button"
              className="px-4 py-2 w-28 border border-borderGray text-sm shadow hover:bg-borderGray hover:shadow-lg duration-150"
            >
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
