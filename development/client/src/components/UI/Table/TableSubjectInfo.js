import useAxios from "../../../hooks/useAxios";
import { Fragment, useState, useEffect, useCallback } from "react";
import classes from "./TableSubjectInfo.module.css";
import * as dateService from "../../../utils/Format/Date";
import InputWithPlaceholder from "../Input/InputWithPlaceholder";
import Input from "../Input/Input";
import { Calendar } from "react-calendar";
import CalendarOneInput from "../Calendar/CalendarOneInput";
import AddHomework from "../../addHomework/AddHomework";
import ConfirmModal from "../ConfirmModal/ConfirmModal";

const isValidUrl = (urlString) => {
  var urlPattern = new RegExp(
    "^(https?:\\/\\/)?" +
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
      "((\\d{1,3}\\.){3}\\d{1,3}))" +
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
      "(\\?[;&a-z\\d%_.~+=-]*)?" +
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );
  return !!urlPattern.test(urlString);
};

const TableSubjectInfo = (props) => {
  const [homework, setHomework] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [enteredInfo, setEnteredInfo] = useState({
    comment: "",
    homeworks: [{ id: null, description: "", dueDate: "", extrasLink: "" }],
    distanceLink: "",
  });
  const [homeworksValid, setHomeWorksValid] = useState([
    {
      descriptionValid: { description: true, errorMessage: "" },
      dueDateValid: { dueDate: true, errorMessage: "" },
      extrasLinkValid: { extrasLink: true, errorMessage: "" },
    },
  ]);
  const [distanceLinkIsValid, setDistanceLinkIsValid] = useState(true);
  const [extraInfoCloseConfirm, setExtraInfoCloseConfirm] = useState(false);

  useEffect(() => {
    setEnteredInfo((prevState) => {
      return {
        ...prevState,
        comment: props.item.comment,
        distanceLink: props.item.distanceLink,
      };
    });
  }, [editMode]);

  const {
    response: homeworkResponse,
    isLoading: homeworkLoading,
    error: homeworkError,
  } = useAxios({
    method: "get",
    url: `/homeworkbycode/${props.item.subjectCode}/${props.item.startTime}`,
  });

  useEffect(() => {
    if (
      !homeworkLoading &&
      homeworkError === "" &&
      homeworkResponse.hasOwnProperty("homework")
    ) {
      setHomework(
        ...homeworkResponse.homework.filter(
          (e) =>
            new Date(e.dueDate).getTime() <
              new Date(props.item.startTime).getTime() &&
            new Date(e.dueDate).getTime() >
              new Date(props.item.startTime).getTime() -
                1000 * 60 * 60 * 24 * 14
        )
      );
      setEnteredInfo((prevState) => {
        return {
          ...prevState,
          homeworks: homeworkResponse.homework.map((obj, i) => {
            return {
              id: obj.id,
              description: obj.description,
              dueDate: obj.dueDate,
              extrasLink: "",
            };
          }),
        };
      });
    }
  }, [homeworkResponse, homeworkError, homeworkLoading, editMode]);

  const addExtraInfoHandler = (event, index) => {
    let fieldName = "";
    let newValue = "";
    if (event.target) {
      fieldName = event.target.name;
      newValue = event.target.value;
    }
    const removeDate = event.target?.id === "removeDate" ? true : false;
    const isDueDate = !event.target && !event.name ? true : false;

    const homework =
      fieldName === "description" ||
      isDueDate ||
      event.name === "extraLink" ||
      event.target?.id === "removeDate";

    setEnteredInfo((prevState) => ({
      comment: event?.name === "comment" ? event.value : prevState.comment,
      homeworks: homework
        ? prevState.homeworks.map((obj, i) => {
            if (i === index)
              return {
                id: obj.id,
                description:
                  fieldName === "description" ? newValue : obj.description,
                dueDate: isDueDate
                  ? new Date(event).toISOString()
                  : removeDate
                  ? ""
                  : obj.dueDate,
                extrasLink:
                  event.name === "extraLink" ? event.value : obj.extrasLink,
              };
            return obj;
          })
        : prevState.homeworks,
      distanceLink:
        event?.name === "distanceLink" ? event.value : prevState.distanceLink,
    }));
    if (event?.name === "distanceLink") {
      if (event.value === "") return setDistanceLinkIsValid(true);
      const timer = setTimeout(
        () => setDistanceLinkIsValid(isValidUrl(event.value)),
        1000
      );
      return () => clearTimeout(timer);
    }
  };

  const homeworksFieldsValid = useCallback(() => {
    setHomeWorksValid((prevState) =>
      prevState.map((obj, i) => {
        const description = enteredInfo.homeworks[i]?.description;
        const dueDate = enteredInfo.homeworks[i]?.dueDate;
        const extrasLink = enteredInfo.homeworks[i]?.extrasLink;
        const dateValid =
          dueDate?.length === 0 || dueDate > new Date().toISOString();
        return {
          descriptionValid:
            description?.length === 0 &&
            (dueDate?.length > 0 || extrasLink?.length > 0)
              ? { description: false, errorMessage: "KIRJELDUS LISAMATA" }
              : { description: true, errorMessage: "" },
          dueDateValid:
            (description?.length > 0 && dueDate.length === 0) || !dateValid
              ? {
                  dueDate: false,
                  errorMessage: !dateValid
                    ? "KUUPÄEV MÖÖDAS"
                    : "TÄHTAEG LISAMATA",
                }
              : { dueDate: true, errorMessage: "" },
          extrasLinkValid:
            extrasLink?.length > 0 && !isValidUrl(extrasLink)
              ? { extrasLink: false, errorMessage: "VIGANE LINK" }
              : { extrasLink: true, errorMessage: "" },
        };
      })
    );
  }, [enteredInfo]);

  useEffect(() => {
    const timer = setTimeout(() => homeworksFieldsValid(), 1000);
    return () => clearTimeout(timer);
  }, [enteredInfo, homeworksFieldsValid]);

  const addRowHandler = () => {
    setEnteredInfo((prevState) => ({
      comment: prevState.comment,
      homeworks: [
        ...prevState.homeworks,
        { description: "", dueDate: "", extrasLink: "" },
      ],
      distanceLink: prevState.distanceLink,
    }));

    setHomeWorksValid((prevState) => [
      ...prevState,
      {
        descriptionValid: { description: true, errorMessage: "" },
        dueDateValid: { dueDate: true, errorMessage: "" },
        extrasLinkValid: { extrasLink: true, errorMessage: "" },
      },
    ]);
  };

  const removeRowHandler = (index) => {
    setEnteredInfo((prevState) => ({
      comment: prevState.comment,
      homeworks: [...prevState.homeworks.filter((e, i) => i !== index)],
      distanceLink: prevState.distanceLink,
    }));
    setHomeWorksValid((prevState) => [
      ...prevState.filter((e, i) => i !== index),
    ]);
  };

  const editInfoHandler = (event) => {
    event.preventDefault();
    setEditMode(true);
  };

  const confirmationHandler = () => {
    setExtraInfoCloseConfirm(false);
    props.onClick();
  };
  const declineHandler = () => {
    setExtraInfoCloseConfirm(false);
  };

  const showConfirmationHandler = () => {
    if (!editMode) props.onClick();
    setExtraInfoCloseConfirm(true);
  };
  const saveInformationHandler = () => {
    const fieldsValid = homeworksValid.filter((e) => {
      return (
        !e.descriptionValid.description ||
        !e.dueDateValid.dueDate ||
        !e.extrasLinkValid.extrasLink
      );
    });
    if (distanceLinkIsValid && fieldsValid.length === 0) {
      setEditMode(false);
      setEnteredInfo({
        comment: "",
        homeworks: [{ id: null, description: "", dueDate: "", extrasLink: "" }],
        distanceLink: "",
      });
      setHomeWorksValid([
        {
          descriptionValid: { description: true, errorMessage: "" },
          dueDateValid: { dueDate: true, errorMessage: "" },
          extrasLinkValid: { extrasLink: true, errorMessage: "" },
        },
      ]);
    }
  };

  return (
    <Fragment>
      <tr
        className={`${classes.extraRowInfo} ${classes.rowHeading} ${classes.headingPadding}`}
      >
        <td colSpan={3} style={{ borderRight: "0rem" }}>
          Õppeinfo:
        </td>
        <td className={classes.actions}>
          {(props.userLecturer || props.admin) && !editMode && (
            <i
              onClick={editInfoHandler}
              className={`${classes.editIcon} bi bi-pencil-fill`}
            ></i>
          )}
          {editMode && (
            <i
              onClick={saveInformationHandler}
              className={`${classes.confirmIcon} bi bi-check-lg`}
            ></i>
          )}
          {editMode && extraInfoCloseConfirm && (
            <div className={classes.closeConfirmInfo}>
              <ConfirmModal
                modalMessage="Sulge ilma salvestamata?"
                onConfirm={confirmationHandler}
                onDecline={declineHandler}
              />
            </div>
          )}
          <i
            onClick={showConfirmationHandler}
            className={`bi bi-x-lg ${classes.closeIcon}`}
          ></i>
        </td>
      </tr>
      {editMode && (
        <tr className={`${classes.extraRowInfo} ${classes.rowInfo}`}>
          <td colSpan={4}>
            <InputWithPlaceholder
              onChange={addExtraInfoHandler}
              name="comment"
              value={enteredInfo.comment}
            />
          </td>
        </tr>
      )}

      {!editMode && homework.description && (
        <tr className={`${classes.extraRowInfo} ${classes.rowInfo}`}>
          <td colSpan={4}>
            {homework.description} <br />
            <strong>{`Tähtaeg: ${dateService.formatDate(
              homework.dueDate
            )}`}</strong>
          </td>
        </tr>
      )}

      {editMode && (
        <>
          <tr className={`${classes.extraRowInfo} ${classes.rowHeading}`}>
            <td colSpan={4}>{`Kodutöö:`}</td>
          </tr>
          <tr className={`${classes.extraRowInfo} ${classes.rowInfo}`}>
            <td colSpan={4}>
              {enteredInfo.homeworks.map((e, i) => {
                return (
                  <AddHomework
                    key={i}
                    onChange={addExtraInfoHandler}
                    homeworkData={e}
                    index={i}
                    onErrors={homeworksValid[i]}
                    onAddRow={addRowHandler}
                    onRemoveRow={removeRowHandler}
                  />
                );
              })}
            </td>
          </tr>
        </>
      )}

      {!editMode && props.item.comment.length > 0 && (
        <tr className={`${classes.extraRowInfo} ${classes.rowHeading}`}>
          <td colSpan={4}>{`Videoloengu link: ${props.item.distanceLink}`}</td>
        </tr>
      )}

      {editMode && (
        <>
          <tr className={`${classes.extraRowInfo} ${classes.rowHeading}`}>
            <td colSpan={4}>{`Videoloengu link:`}</td>
          </tr>
          <tr className={`${classes.extraRowInfo} ${classes.rowInfo}`}>
            <td colSpan={4}>
              <InputWithPlaceholder
                onChange={addExtraInfoHandler}
                name="distanceLink"
                value={enteredInfo.distanceLink}
                placeholder="URL kujul"
                hasErrors={!distanceLinkIsValid}
                errorMessage={!distanceLinkIsValid ? "VIGANE LINK" : ""}
              />
            </td>
          </tr>
        </>
      )}
      {props.item.subjectCode.length > 4 && (
        <tr className={`${classes.extraRowInfo} ${classes.rowHeading}`}>
          <td colSpan={4}>
            Link ainekaardile:<br></br>
            <a
              href={`https://ois2.tlu.ee/tluois/aine/${props.item.subjectCode}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {`https://ois2.tlu.ee/tluois/aine/${props.item.subjectCode}`}
            </a>
          </td>
        </tr>
      )}
      <tr className={`${classes.extraRowInfo} ${classes.rowHeading}`}>
        <td colSpan={4}>{`${props.item.subject} järgmised toimumisajad:`}</td>
      </tr>
      {props.rawData.map((e, i) => {
        let time1 = dateService.formatMilliseconds(e.startTime);
        let time2 = dateService.formatMilliseconds(props.item.startTime);

        if (e.subject.includes(props.item.subject) && time1 > time2) {
          return (
            <tr
              key={i}
              className={`
      ${classes.extraRowInfo} ${classes.rowInfo}`}
            >
              <td colSpan={4}>{`${dateService
                .formatDateTime(e.startTime)
                .toString()}-${dateService
                .formatHoursMinutes(e.endTime)
                .toString()} ${e.subject}`}</td>
            </tr>
          );
        }
        return null;
      })}
      <tr>
        <td colSpan={4} className={classes.bottomRow}></td>
      </tr>
    </Fragment>
  );
};

export default TableSubjectInfo;
