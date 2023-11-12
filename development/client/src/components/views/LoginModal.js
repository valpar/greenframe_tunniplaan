import React, { Fragment, useEffect } from "react";
import ReactDOM from "react-dom";
import Input from "../UI/Input/Input";

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

const ConfirmModalOverlay = (props) => {
  
  const changeHandler = (input) => {
    
    if (input.name==="email") {
      props.onEmailChange(input.value);
    }
    if (input.name==="password") {
      props.onPasswordChange(input.value);
    }
  }
  

  let arrow =
    "absolute z-40 w-8 h-8 -rotate-45 -right-4 bg-white top-1/2 -translate-y-1/2";
  if (props.topArrow)
    arrow =
      "absolute z-40 w-8 h-8 -rotate-45 -top-4 bg-white left-1/2 -translate-x-1/2";
  if (props.bottomArrow)
    arrow =
      "absolute z-40 w-8 h-8 -rotate-45 -bottom-4 bg-white left-1/2 -translate-x-1/2";

  return (
    <div className="fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 lg:translate-x-0 lg:translate-y-0 lg:left-auto lg:top-auto lg:relative w-auto h-auto space-y-2 bg-white p-4 rounded z-30 shadow-lg">
      <div className={`hidden lg:block ${arrow}`}></div>
      <div className="pb-4 text-center">
        <p>{props.modalMessage}</p>
      </div>

      <label>
        E-mail: 
        <Input
          name="email" 
          value={props.email} 
          onChange={changeHandler} 
          readOnly={false}
          className={`p-2 border ${
            props.hasError || props.errorMessage
              ? "border-red-500"
              : "border-borderBlack "
          } rounded-none font-normal focus:outline-none focus:border-black`}
        />
      </label>
      <label>
        Parool: 
        <Input 
          name="password" 
          value={props.password} 
          onChange={changeHandler} 
          type="password" readOnly={false} 
          className={`p-2 border ${
            props.hasError || props.errorMessage
              ? "border-red-500"
              : "border-borderGray "
          } rounded-none font-normal focus:outline-none focus:border-black`}
        />
      </label>


      <div className="flex space-x-4">
        <button
          onClick={props.onDecline}
          type="button"
          className="border border-borderGray py-1 px-2 w-24 hover:bg-borderGray"
        >
          {props.modalButtons ? props.modalButtons[0] : `EI`}
        </button>
        <button
          onClick={props.onConfirm}
          type="button"
          className="border border-borderGray py-1 px-2 w-24 hover:bg-borderGray"
        >
          {props.modalButtons ? props.modalButtons[1] : `JAH`}
        </button>
      </div>
    </div>
  );
};



const portalElement = document.getElementById("overlays");

const LoginModal = (props) => {

  return (
    
    <Fragment>
      {ReactDOM.createPortal(<Backdrop />, portalElement)}
      <ConfirmModalOverlay {...props} /> 
    </Fragment>
    
  );
};

export default LoginModal;
