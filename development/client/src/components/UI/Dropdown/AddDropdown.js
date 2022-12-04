import { useEffect, useState } from "react";
import Select, {
  components,
  ControlProps,
  Props,
  StylesConfig,
} from "react-select";
import classes from "./AddDropdown.module.css";
import TooltipLarge from "../Tooltip/TooltipLarge";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

const Control = ({ children, ...props }) => {
  const { icon, onEdit, showPencil } = props.selectProps;
  const style = { cursor: "pointer" };
  return (
    <components.Control {...props}>
      {showPencil && (
        <span onClick={onEdit} style={style}>
          {icon}
        </span>
      )}
      {children}
    </components.Control>
  );
};

const AddDropdown = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState(undefined);
  const [showPencil, setShowPencil] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const icon = <i className="bi bi-pencil-fill"></i>;

  const styles = {
    control: (css) => ({ ...css, paddingLeft: "0.6rem", borderRadius: "none" }),
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
      setShowPencil(false);
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
    if (props.value?.length === 1 || typeof props.value === "number")
      return setShowPencil(true);
    setShowPencil(false);
  };
  const mouseLeaveHandler = () => {
    setShowTooltip(false);
    setShowPencil(false);
  };
  const declineHandler = () => {
    if (showConfirmModal) {
      setMenuIsOpen(undefined);
      setShowPencil(false);
      return setShowConfirmModal(false);
    }
    props.onDecline(props.name);
  };
  const editHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setMenuIsOpen(false);
    setShowConfirmModal(true);
  };
  const confirmHandler = () => {
    setMenuIsOpen(undefined);
    setShowPencil(false);
    setShowConfirmModal(false);
    props.onEdit(props.value);
  };
  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        {!isMenuOpen && (
          <FontAwesomeIcon icon={faAngleDown} className={classes.arrowIcon} />
        )}
        {isMenuOpen && (
          <FontAwesomeIcon icon={faAngleUp} className={classes.arrowIcon} />
        )}
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
      className={
        props.cssClass ? classes[props.cssClass] : classes.dropdownFilters
      }
    >
      {props.topLabel && <label>{props.topLabel}</label>}
      {props.onErrorMessage && props.onErrorMessage !== "" && showTooltip && (
        <div className={classes.tooltip}>
          <TooltipLarge index={props.index} message={props.onErrorMessage} />
        </div>
      )}

      <Select
        onMenuClose={menuCloseHandler}
        onMenuOpen={menuOpenHandler}
        showPencil={showPencil}
        menuIsOpen={menuIsOpen}
        isSearchable
        icon={icon}
        onEdit={editHandler}
        components={{ Control, DropdownIndicator }}
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
        <div className={classes.confirmModal}>
          <ConfirmModal
            modalMessage={
              showConfirmModal
                ? `KAS SOOVID MUUTA`
                : props.modalMessage?.message
            }
            topArrow={true}
            onConfirm={showConfirmModal ? confirmHandler : props.onConfirm}
            onDecline={declineHandler}
          />
        </div>
      )}
      {props.hasError && <div className={classes.errorHandling} />}
    </div>
  );
};

export default AddDropdown;
