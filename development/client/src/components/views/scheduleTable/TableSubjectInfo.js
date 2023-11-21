import useAxios from "../../../hooks/useAxios";
import { Fragment, useState, useEffect, useCallback } from "react";
import * as dateService from "../../../utils/Format/Date";
import InputWithPlaceholder from "../../UI/Input/InputWithPlaceholder";
import AddHomework from "../AddHomework";
import ConfirmModal from "../../UI/ConfirmModal/ConfirmModal";
import axios from "axios";
import content from "../../../assets/content/content.json";
import RequestModal from "../../UI/RequestModal/RequestModal";
import TooltipLarge from "../../UI/Tooltip/TooltipLarge";
import { Spinner } from "../../UI/Spinner";

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

axios.defaults.baseURL = `${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}`;

const TableSubjectInfo = (props) => {
  const {admin, userLecturer} = props;

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
  const [extraInfoSaveConfirm, setExtraInfoSaveConfirm] = useState(false);
  const [commentValid, setCommentValid] = useState(true);
  const [updateRequest, setUpdateRequest] = useState(true);
  const {
    lectureInfo,
    homeworkContent,
    studyMaterials,
    deadline,
    comment,
    videoLecture,
    subjectCard,
    nextLectures,
  } = content.lectureInformation;
  const { brokenLink, maxCommentSize, mandatoryField, datePassed } =
    content.errorMessages;
  const { withoutSaveMessage, saveMessage } = content.confirmModalMessages;
  const [requestError, setRequestError] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState(false);
  const [deleteHomeworkRequestSuccess, setDeleteHomeworkRequestSuccess] =
    useState(false);
  const [requestLoading, setRequestLoading] = useState(false);
  const [requestMessage, setRequestMessage] = useState("");
  const [requestType, setRequestType] = useState("");
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showNotValidTooltip, setShowNotValidTooltip] = useState(false);

  useEffect(() => {
    if(!admin && !userLecturer) {
      setEditMode(false);
    }
  })

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
  } = useAxios(
    {
      method: "get",
      url: `/homeworkbycode/${props.item.subject.subjectCode}/${props.item.startTime}`,
    },
    updateRequest
  );

  useEffect(() => {
    if (!homeworkLoading && homeworkResponse?.homework) {
      setHomework(...homeworkResponse.homework);
      setEnteredInfo((prevState) => {
        return {
          ...prevState,
          homeworks: homeworkResponse.homework.map((obj, i) => {
            return {
              id: obj.id,
              description: obj.description,
              dueDate: obj.dueDate,
              extrasLink: obj.extrasLink,
            };
          }),
        };
      });
      setHomeWorksValid(
        Array.from(homeworkResponse.homework, (item) => {
          return {
            descriptionValid: { description: true, errorMessage: "" },
            dueDateValid: { dueDate: true, errorMessage: "" },
            extrasLinkValid: { extrasLink: true, errorMessage: "" },
          };
        })
      );
    }
  }, [homeworkResponse, homeworkError, homeworkLoading, editMode]);

  const addExtraInfoHandler = (event, index) => {
    let fieldName = "";
    let newValue = "";
    if (event?.target) {
      fieldName = event.target.name;
      newValue = event.target.value;
    }
    const removeDate = event?.target?.id === "removeDate" ? true : false;
    const isDueDate = !event?.target && !event?.name && event ? true : false;

    if (event?.name === "comment") {
      const commentLenghtValid = event?.value?.length < 50;
      setCommentValid(commentLenghtValid);
    }

    const homework =
      fieldName === "description" ||
      isDueDate ||
      event?.name === "extraLink" ||
      event?.target?.id === "removeDate" ||
      !event;

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
                  : !event
                  ? ""
                  : obj.dueDate,
                extrasLink:
                  event?.name === "extraLink" ? event?.value : obj.extrasLink,
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
          dueDate?.length === 0 ||
          dueDate.substring(0, 10) >= new Date().toISOString().substring(0, 10);
        return {
          descriptionValid:
            description?.length === 0 &&
            (dueDate?.length > 0 || extrasLink?.length > 0)
              ? { description: false, errorMessage: mandatoryField }
              : { description: true, errorMessage: "" },
          dueDateValid:
            (description?.length > 0 && dueDate.length === 0) || !dateValid
              ? {
                  dueDate: false,
                  errorMessage: !dateValid ? datePassed : mandatoryField,
                }
              : { dueDate: true, errorMessage: "" },
          extrasLinkValid:
            extrasLink?.length > 0 && !isValidUrl(extrasLink)
              ? { extrasLink: false, errorMessage: brokenLink }
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

  const removeRowHandler = async (index, homeworkId) => {
    if (homeworkId) {
      try {
        setShowRequestModal(true);
        setRequestLoading(true);

        await axios.delete(`/homeworks/${homeworkId}`).then((response) => {});
      } catch (error) {
        setRequestType("delete");
        setRequestLoading(false);
        setRequestError(true);
        setRequestMessage(content.errorMessages.requestDeleteError);
        setExtraInfoSaveConfirm(false);
        return;
      }
      setRequestLoading(false);
      setRequestMessage(content.successMessages.delete);
      setDeleteHomeworkRequestSuccess(true);
      setExtraInfoSaveConfirm(false);
    }
    if (enteredInfo.homeworks.length === 1) {
      setEnteredInfo((prevState) => ({
        comment: prevState.comment,
        homeworks: [{ id: null, description: "", dueDate: "", extrasLink: "" }],
        distanceLink: prevState.distanceLink,
      }));
      setHomeWorksValid([
        {
          descriptionValid: { description: true, errorMessage: "" },
          dueDateValid: { dueDate: true, errorMessage: "" },
          extrasLinkValid: { extrasLink: true, errorMessage: "" },
        },
      ]);
      setHomework([]);
      return;
    }

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
    setExtraInfoSaveConfirm(false);
  };

  const showConfirmationHandler = () => {
    if (!editMode) props.onClick();
    setExtraInfoCloseConfirm(true);
  };

  const fieldValidator = () => {
    const fieldsValid = homeworksValid.filter((e) => {
      return (
        !e.descriptionValid.description ||
        !e.dueDateValid.dueDate ||
        !e.extrasLinkValid.extrasLink
      );
    });

    const homeWorkValid = homeworksValid.filter((homework) => {
      return (
        !homework.descriptionValid.description ||
        !homework.dueDateValid.dueDate ||
        !homework.extrasLinkValid.extrasLink
      );
    });

    return (
      commentValid &&
      distanceLinkIsValid &&
      fieldsValid.length === 0 &&
      homeWorkValid.length === 0
    );
  };

  const saveInformationHandler = async () => {
    const homeworksNotEmpty = enteredInfo.homeworks.every((e) => {
      return e.description !== "" && e.dueDate !== "";
    });
    if (fieldValidator()) {
      try {
        setShowRequestModal(true);
        setRequestLoading(true);
        await axios
          .patch(`/schedule/${props.item.id}`, {
            ...props.item,
            comment: enteredInfo.comment,
            distanceLink: enteredInfo.distanceLink,
            subjectId: props.item.subject.id,
          })
          .then((response) => {});
        enteredInfo.homeworks.forEach(async (e, i) => {
          if (e.id) {
            await axios
              .patch(`/homeworks/${e.id}`, {
                ...e,
                subjectCode: props.item.subject.subjectCode,
                subjects_id: props.item.subject.id,
              })
              .then((response) => {});
          }
          if (!e.id && homeworksNotEmpty) {
            await axios
              .post(`/homeworks`, {
                ...e,
                subjectCode: props.item.subject.subjectCode,
              })
              .then((response) => {});
          }
        });
      } catch (error) {
        setRequestLoading(false);
        setRequestError(true);
        setRequestMessage("Salvestamine ebaõnnestus");
        setExtraInfoSaveConfirm(false);
        return;
      }
      setRequestLoading(false);
      setRequestMessage("Salvestamine õnnestus");
      setRequestSuccess(true);
      setExtraInfoSaveConfirm(false);
    }
  };

  const showSaveConfirmHandler = () => {
    fieldValidator()
      ? setExtraInfoSaveConfirm(true)
      : setShowNotValidTooltip(true);
  };

  const failedRequestConfirmHandler = () => {
    requestType === "delete" ? removeRowHandler() : saveInformationHandler();
  };

  const endRequestHandler = () => {
    setShowRequestModal(false);
    setRequestSuccess(false);
    setRequestMessage("");

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
    setUpdateRequest((prevState) => (prevState = !prevState));
    props.onUpdate();
    setEditMode(false);
  };
  const endDeleteRequest = () => {
    setShowRequestModal(false);
    setDeleteHomeworkRequestSuccess(false);
    setRequestMessage("");
    setRequestType("");

    setUpdateRequest((prevState) => (prevState = !prevState));
    props.onUpdate();
  };

  useEffect(() => {
    if (requestSuccess) {
      const timer = setTimeout(() => {
        endRequestHandler();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [requestSuccess]);

  useEffect(() => {
    if (deleteHomeworkRequestSuccess) {
      const timer = setTimeout(() => {
        endDeleteRequest();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [deleteHomeworkRequestSuccess]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotValidTooltip(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [showNotValidTooltip]);

  return (
    <Fragment>
      <tr className="border-x border-borderGray">
        <td colSpan={4} className="">
          <div className="relative flex justify-center items-center w-full p-2 pt-4">
            <div>
              <h6 className="font-semibold">
                {editMode ? lectureInfo.editName : lectureInfo.name}
              </h6>
            </div>
            <div className="absolute right-2 top-2 space-x-4 px-2">
              {(props.userLecturer || props.admin) && !editMode && (
                <i
                  onClick={editInfoHandler}
                  className="bi bi-pencil-fill cursor-pointer text-2xl lg:text-xl"
                ></i>
              )}
              {editMode && extraInfoCloseConfirm && (
                <div className="absolute right-14 -top-11">
                  <ConfirmModal
                    modalMessage={withoutSaveMessage}
                    onConfirm={confirmationHandler}
                    onDecline={declineHandler}
                  />
                </div>
              )}
              <i
                onClick={showConfirmationHandler}
                className="bi bi-x-lg cursor-pointer text-3xl lg:text-2xl"
              ></i>
            </div>
          </div>
        </td>
      </tr>
      {editMode && (
        <tr className="subject-info-tr">
          <td colSpan={4} className="pl-2">
            {comment.name}
          </td>
        </tr>
      )}
      {editMode && (
        <tr className="subject-info-tr">
          <td colSpan={4} className="px-2 pt-1 pb-4">
            <div className="m-4">
              <InputWithPlaceholder
                onChange={addExtraInfoHandler}
                name="comment"
                value={enteredInfo.comment}
                hasErrors={!commentValid}
                errorMessage={!commentValid ? maxCommentSize : ""}
                maxLength={50}
                placeholder={comment.placeholder}
              />
            </div>
          </td>
        </tr>
      )}
      <tr
        className={`${
          homeworkLoading ? "visible" : "hidden"
        } border-x border-borderGray`}
      >
        <td colSpan={4}>
          <Spinner containerStyle="py-8" iconSize="w-10 h-10" />
        </td>
      </tr>
      {!editMode &&
        props.isLoggedIn &&
        homework?.description &&
        (homeworkResponse?.homework
          ? homeworkResponse.homework
          : enteredInfo.homeworks
        ).map((homework, i) => {
          return (
            <>
              {i === 0 && (
                <tr key={i + 1000000} className="subject-info-tr">
                  <td colSpan={4} className="px-2 pb-4">
                    {homeworkContent.name}
                  </td>
                </tr>
              )}
              <tr
                key={i}
                className="border-x border-borderGray text-left text-sm"
              >
                <td colSpan={4} className="px-2 pb-4">
                  <div className="p-4 border shadow shadow-borderGray">
                    <div className="md:text-base">{homework.description}</div>{" "}
                    <br />
                    <div
                      className={`flex ${
                        homework.extrasLink ? "justify-between" : "justify-end"
                      } md:justify-start space-x-4 font-bold`}
                    >
                      {homework.extrasLink && (
                        <a
                          rel="noreferrer"
                          target="_blank"
                          href={homework.extrasLink}
                          className="lg:hover:text-collegeRed duration-150 underline underline-offset-4"
                        >
                          {studyMaterials.name}
                        </a>
                      )}

                      {homework?.dueDate && (
                        <div className="text-collegeRed">{`${
                          deadline.name
                        } ${dateService.formatDate(homework.dueDate)}`}</div>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            </>
          );
        })}

      {editMode && (
        <>
          <tr className="subject-info-tr">
            <td colSpan={4} className="px-2">
              {homeworkContent.name}
            </td>
          </tr>
          <tr className="border-x border-borderGray">
            <td colSpan={4} className="px-2">
              {enteredInfo.homeworks.map((e, i, s) => {
                return (
                  <div key={i}>
                    <AddHomework
                      key={i}
                      onChange={addExtraInfoHandler}
                      homeworkData={e}
                      index={i}
                      onErrors={homeworksValid[i]}
                      onAddRow={addRowHandler}
                      onRemoveRow={removeRowHandler}
                      arrayLength={s.length}
                    />
                    <i
                      className={`bi bi-plus-lg ${
                        i !== s.length - 1 ? "hidden" : ""
                      } lg:hidden text-4xl`}
                      onClick={addRowHandler}
                    ></i>
                  </div>
                );
              })}
            </td>
          </tr>
        </>
      )}

      {!editMode && props.item.comment.length > 0 && props.isLoggedIn && (
        <tr className="subject-info-tr">
          <td colSpan={4}>
            <div className="px-2 pb-4">
              <a
                rel="noreferrer"
                target="_blank"
                href={props.item.distanceLink}
                className="lg:hover:text-collegeRed duration-150 underline underline-offset-4"
              >
                {videoLecture.name}
              </a>
            </div>
          </td>
        </tr>
      )}

      {editMode && (
        <>
          <tr className="subject-info-tr">
            <td colSpan={4} className="pl-2 pt-4">
              {videoLecture.editName}
            </td>
          </tr>
          <tr className="border-x border-borderGray">
            <td colSpan={4} className="px-2 pb-4">
              <div className="m-4">
                <InputWithPlaceholder
                  onChange={addExtraInfoHandler}
                  name="distanceLink"
                  value={enteredInfo.distanceLink}
                  placeholder={videoLecture.placeholder}
                  hasErrors={!distanceLinkIsValid}
                  errorMessage={!distanceLinkIsValid ? brokenLink : ""}
                />
              </div>
            </td>
          </tr>
        </>
      )}
      {editMode && (
        <tr className="border-x border-borderGray">
          <td colSpan={4} className="pb-5">
            <div className="relative">
              {extraInfoSaveConfirm && (
                <div className="absolute right-1/2 translate-x-1/2 z-20 -top-36">
                  <ConfirmModal
                    modalMessage={saveMessage}
                    onConfirm={saveInformationHandler}
                    onDecline={declineHandler}
                    bottomArrow={true}
                  />
                </div>
              )}
              {showNotValidTooltip && (
                <div className="absolute bottom-12 right-1/2 translate-x-1/2">
                  <TooltipLarge
                    message={content.errorMessages.mandatoryFields}
                  />
                </div>
              )}
              <button
                className="bg-borderGray px-4 lg:px-8 py-2 font-bold text-sm border border-borderGray shadow hover:bg-darkGray hover:text-white hover:shadow-lg duration-150"
                onClick={showSaveConfirmHandler}
              >
                SALVESTA
              </button>
            </div>
          </td>
        </tr>
      )}
      {!editMode && props.item.subject.subjectCode.length > 4 && (
        <tr className="subject-info-tr">
          <td colSpan={4}>
            <div className="px-2 pb-4">
              {`${subjectCard} `}
              <a
                href={`https://ois2.tlu.ee/tluois/aine/${props.item.subject.subjectCode}`}
                target="_blank"
                rel="noopener noreferrer"
                className="lg:hover:text-collegeRed duration-150 underline underline-offset-4"
              >
                {props.item.subject.subjectCode}
              </a>
            </div>
          </td>
        </tr>
      )}
      {!editMode && (
        <tr className="subject-info-tr">
          <td colSpan={4} className="px-2">
            {nextLectures}
          </td>
        </tr>
      )}
      {!editMode &&
        props.rawData.map((e, i) => {
          let time1 = dateService.formatMilliseconds(e.startTime);
          let time2 = dateService.formatMilliseconds(props.item.startTime);
          let arr = [];
          if (e.courses !== "") {
            arr = e.courses.filter((course) => {
              if (props.item.courses !== "") {
                let hasCourse = props.item.courses.filter(
                  (crs) => crs.courseId === course.courseId
                );
                return hasCourse?.length > 0 ? true : false;
              }
              return false;
            });
          }

          if (
            e.subject.subject.includes(props.item.subject.subject) &&
            time1 > time2 &&
            arr?.length > 0
          ) {
            return (
              <tr
                key={i}
                className="text-left text-sm md:text-base border-x border-borderGray"
              >
                <td colSpan={4} className="px-2">{`${dateService
                  .formatDateTime(e.startTime)
                  .toString()}-${dateService.formatHoursMinutes(e.endTime)} ${
                  e.subject.subject
                }`}</td>
              </tr>
            );
          }
          return null;
        })}
      <tr>
        <td colSpan={4} className="py-1 border-x border-b border-borderGray">
          {showRequestModal && (
            <RequestModal
              error={requestError}
              success={requestSuccess || deleteHomeworkRequestSuccess}
              loading={requestLoading}
              modalMessage={requestMessage}
              customStyle="lg:ml-32"
              onDecline={
                requestType === "delete" ? endDeleteRequest : endRequestHandler
              }
              onConfirm={failedRequestConfirmHandler}
            />
          )}
        </td>
      </tr>
    </Fragment>
  );
};

export default TableSubjectInfo;
