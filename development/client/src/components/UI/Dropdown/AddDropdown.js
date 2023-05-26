import { useState, useEffect } from "react";
import Select, { components } from "react-select";
import TooltipLarge from "../Tooltip/TooltipLarge";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import content from "../../../assets/content/content.json";

const Option = (props) => {
  const { icon, onEdit } = props.selectProps;

  const editHandler = () => {
    onEdit(props.data);
  };

  return (
    <>
      <components.Option {...props}>
        <div className="flex flex-row justify-between items-center">
          <div className="text-sm min-h-[2rem] leading-8 lg:h-auto lg:leading-7">
            {props.children}
          </div>

          <div
            className={`${
              props.children === "Lisa uus..." ? "hidden" : "flex"
            }`}
          >
            <div className="h-11/12 border-l border-borderGray" />
            <div
              className="group flex items-center justify-center w-12 h-12 lg:w-8 lg:h-8 ml-1 -mr-2 cursor-pointer rounded-full hover:bg-collegeGreen duration-150"
              onClick={editHandler}
            >
              <span className="group-hover:scale-105 duration-150">{icon}</span>
            </div>
          </div>
        </div>
      </components.Option>
    </>
  );
};

const AddDropdown = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState(undefined);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [placeholderColor, setPlaceHolderColor] = useState("gray");
  const [editData, setEditData] = useState({});

  const { updateConfirmMessage } = content.confirmModalMessages;

  const icon = (
    <i
      aria-hidden="true"
      focusable="false"
      className="bi bi-pencil-fill inline-block"
    ></i>
  );

  const styles = {
    control: (baseStyles) => ({
      ...baseStyles,
      paddingLeft: "0.6rem",
      borderRadius: "none",
      minHeight: "2.8rem",
      boxShadow: "none",
      "&:hover": {
        border: "1px solid black",
        textColor: "black",
      },
      border: `${props.hasError ? "1px solid red" : "1px solid #CECECE"}`,
    }),
    placeholder: (baseStyles, state) => ({
      ...baseStyles,
      color: placeholderColor,
      marginLeft: "36px",
    }),
    indicatorsContainer: (baseStyles) => ({
      ...baseStyles,
      pointerEvents: "none",
    }),
    option: (baseStyles, state) => ({
      ...baseStyles,
      backgroundColor: state.isSelected
        ? "#E0E0E0"
        : state.isFocused
        ? "#E0E0E0"
        : "#fff",
      color:
        state.isClearable || state.isSelected
          ? "black"
          : state.isFocused
          ? "black"
          : "black",
      ":hover": {
        backgroundColor: state.isSelected ? "#E0E0E0" : "#E0E0E0",
      },
    }),
  };

  const changeHandler = (choice) => {
    let newArrayOfObj;
    if (props.isMulti) {
      newArrayOfObj = choice.map(({ value }) => ({
        [props.name + "Id"]: value,
      }));
    }
    if (!props.isMulti) {
      newArrayOfObj = [choice].map(({ value }) => ({
        [props.name + "Id"]: value,
      }));
    }

    if (newArrayOfObj.length > 0) {
      props.onChange(newArrayOfObj);
    } else {
      props.onChange([{ value: props.name }]);
    }
  };

  const inputChangeHandler = (e) => {
    if (props.onInputChange) {
      props.onInputChange(e);
    }
  };

  const mouseEnterHandler = () => {
    setShowTooltip(true);
    setPlaceHolderColor("black");
  };
  const mouseLeaveHandler = () => {
    setShowTooltip(false);
    setPlaceHolderColor("gray");
  };
  const declineHandler = () => {
    if (showConfirmModal) {
      setMenuIsOpen(undefined);
      return setShowConfirmModal(false);
    }
    props.onDecline(props.name);
  };
  const editHandler = (dataObj) => {
    setEditData(dataObj);
    setMenuIsOpen(false);
    setShowConfirmModal(true);
  };
  const confirmHandler = () => {
    setMenuIsOpen(undefined);
    setShowConfirmModal(false);
    props.onEdit({ ...editData, type: props.name });
  };
  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        {!isMenuOpen && <FontAwesomeIcon icon={faAngleDown} className="px-1" />}
        {isMenuOpen && <FontAwesomeIcon icon={faAngleUp} className="px-1" />}
      </components.DropdownIndicator>
    );
  };

  const menuOpenHandler = () => {
    setIsMenuOpen(true);
  };
  const menuCloseHandler = () => {
    setIsMenuOpen(false);
  };

  return (
    <div
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      className="relative w-full h-auto"
    >
      {props.topLabel && <label>{props.topLabel}</label>}
      {props.onErrorMessage &&
        props.onErrorMessage !== "" &&
        (showTooltip || "") && (
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-full max-w-xs">
            <TooltipLarge index={props.index} message={props.onErrorMessage} />
          </div>
        )}

      <Select
        onMenuClose={menuCloseHandler}
        onMenuOpen={menuOpenHandler}
        menuIsOpen={menuIsOpen}
        isSearchable
        icon={icon}
        onEdit={editHandler}
        components={{ DropdownIndicator, Option }}
        styles={styles}
        placeholder={props.label}
        options={props.options}
        onChange={changeHandler}
        isMulti={props.isMulti ? true : false}
        isClearable={false}
        onInputChange={inputChangeHandler}
        noOptionsMessage={(value) => (value = "")}
        value={
          props.value === ""
            ? props.value
            : props.options.filter(({ value }) => {
                if (typeof props.value === "number")
                  return value === props.value;
                return props.value?.find((v) => {
                  return Object.values(v)[0] === value;
                });
              })
        }
      />
      {(props.modalMessage?.show || showConfirmModal) && (
        <div className="absolute lg:top-16 lg:-left-6">
          <ConfirmModal
            modalMessage={
              showConfirmModal
                ? updateConfirmMessage
                : props.modalMessage?.message
            }
            topArrow={true}
            onConfirm={showConfirmModal ? confirmHandler : props.onConfirm}
            onDecline={declineHandler}
            modalButtons={props.modalButtons}
          />
        </div>
      )}
    </div>
  );
};

export default AddDropdown;
