import { Fragment, useState } from "react";
import classes from "./TableRow.module.css";
import TableSubjectInfo from "./TableSubjectInfo";
import { formatHoursMinutes } from "../../../utils/Format/Date";
import useAxios from "../../../hooks/useAxios";
import ScheduleAddition from "../../scheduleAddition/ScheduleAddition";

const TableBody = (props) => {
  const subjectCode =
    props.item.subjectCode.length > 4 ? props.item.subjectCode : "HHHHH";
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

  const lectureEditHandler = () => {
    setShowEditModal(true);
  };

  return (
    <Fragment>
      <tr
        className={classes.tableHead}
        key={props.id}
        onMouseEnter={mouseEnterHandler}
        onMouseLeave={mouseLeaveHandler}
      >
        <td>
          {formatHoursMinutes(props.item.startTime).toString() +
            "-" +
            formatHoursMinutes(props.item.endTime).toString()}
        </td>
        <td onClick={extraInfoHandler}>
          <div className={classes.subject}>
            {props.item.subject}
            {(props.item.comment || props.item?.homeworks) && (
              <i className={`bi bi-info-circle ${classes.infoIcon}`}></i>
            )}
          </div>
        </td>
        <td>{joinLecturers(props.item)}</td>
        <td>
          <div
            className={
              joinRooms(props.item).length > 0
                ? classes.subject
                : classes.oneItem
            }
          >
            {joinRooms(props.item)}
            {props.item.distanceLink && (
              <i
                className={`bi bi-camera-video-fill ${classes.meetingIcon}`}
              ></i>
            )}
            {showEdit && props.admin && (
              <i
                onClick={lectureEditHandler}
                className={`bi bi-pencil-fill ${classes.editIcon}`}
              ></i>
            )}
          </div>
        </td>
      </tr>
      {showEditModal && props.admin && (
        <tr>
          <td colSpan={4} className={classes.editColumn}>
            <div className={classes.editSchedule}>
              <ScheduleAddition editMode="editMode" />
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
        />
      )}
    </Fragment>
  );
};

export default TableBody;
