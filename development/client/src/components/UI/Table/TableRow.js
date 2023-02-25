import { Fragment, useState } from "react";
import classes from "./TableRow.module.css";
import TableSubjectInfo from "./TableSubjectInfo";
import { formatHoursMinutes } from "../../../utils/Format/Date";
import ScheduleAddition from "../../scheduleAddition/ScheduleAddition";
import { ReactComponent as CameraIcon } from "../../../assets/icons/camera.svg";
import { ReactComponent as InfoIcon } from "../../../assets/icons/info.svg";
import { useEffect } from "react";

const TableBody = (props) => {
  const subjectCode =
    props.item.subject.subjectCode.length > 4
      ? props.item.subject.subjectCode
      : "HHHHH";
  const [showInfo, setShowInfo] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const extraInfoHandler = () => {
    setShowInfo((prevState) => (prevState = !prevState));
  };
  const joinLecturers = (item) => {
    if (item.lecturers)
      return item.lecturers
        .map((e) => `${e.firstName} ${e.lastName}`)
        .join(" ");
    return "";
  };

  const joinRooms = (item) => {
    if (item.rooms) return item.rooms.map((e) => e.room).join(" ");
    return "";
  };

  const mouseEnterHandler = () => {
    setShowEdit(true);
  };
  const mouseLeaveHandler = () => {
    setShowEdit(false);
  };
  const handleResize = () => {
    if (window.innerWidth <= 769) {
      setShowEdit(true);
    } else {
      setShowEdit(false);
    }
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });

  const lectureEditHandler = () => {
    setShowEditModal(true);
  };

  const closeEditModalHandler = () => {
    setShowEditModal(false);
  };

  return (
    <Fragment>
      <tr
        className="text-xs xs2:text-sm md:text-base h-12 border border-borderGray divide-x divide-borderGray"
        key={props.id}
        onMouseEnter={mouseEnterHandler}
        onMouseLeave={mouseLeaveHandler}
      >
        <td className="p-1 w-[5.5rem] md:w-28">
          {formatHoursMinutes(props.item.startTime).toString() +
            "-" +
            formatHoursMinutes(props.item.endTime).toString()}
        </td>
        <td
          onClick={extraInfoHandler}
          className="p-1 md:p-2 lg:hover:font-semibold duration-200"
        >
          <div className="flex flex-col justify-between items-center md:flex-row">
            <div className="">
              {props.item.subject.subject} <br />
              <i>{props.item.comment}</i>
            </div>

            {(props.item.comment || props.item?.homeworks) &&
              props.isLoggedIn && <InfoIcon className="w-6 h-auto py-1" />}
          </div>
        </td>
        <td className="p-1 md:p-2 lg:w-60 md:w-52 xl:w-80 text-center md:text-left">
          {joinLecturers(props.item)}
        </td>
        <td className="p-1 md:p-2 md:w-48">
          <div className="flex flex-col justify-between items-center md:flex-row">
            {joinRooms(props.item)}
            <div
              className={`flex items-center w-fit ${
                showEdit && props.admin && props.item.distanceLink
                  ? "justify-end"
                  : "justify-center"
              } md:justify-end ${
                props.item.rooms ? "" : "md:w-full"
              } pt-1 pr-1 md:pr-0 md:pt-0`}
            >
              {props.item.distanceLink && props.isLoggedIn && (
                <div>
                  <a
                    rel="noreferrer"
                    target="_blank"
                    href={props.item.distanceLink}
                  >
                    <CameraIcon className="w-6 h-auto" />
                  </a>
                </div>
              )}
              {showEdit && props.admin && (
                <div
                  className={`${
                    showEdit && props.item.distanceLink ? "ml-5" : ""
                  }`}
                >
                  <i
                    onClick={lectureEditHandler}
                    className="bi bi-pencil-fill"
                  ></i>
                </div>
              )}
            </div>
          </div>
        </td>
      </tr>
      {showEditModal && props.admin && (
        <tr className="">
          <td colSpan={4} className={classes.editColumn}>
            <div className={classes.editSchedule}>
              <ScheduleAddition
                onClose={closeEditModalHandler}
                editMode="editMode"
                editData={props.item}
                onUpdate={props.onUpdate}
                scheduled={props.rawData}
              />
            </div>
          </td>
        </tr>
      )}
      {showInfo && (
        <TableSubjectInfo
          admin={props.admin}
          userLecturer={props.userLecturer}
          onClick={extraInfoHandler}
          item={props.item}
          data={props.data}
          rawData={props.rawData}
          onUpdate={props.onUpdate}
          isLoggedIn={props.isLoggedIn}
        />
      )}
    </Fragment>
  );
};

export default TableBody;
