import { Fragment, useState } from "react";
import classes from "./TableRow.module.css";
import TableSubjectInfo from "./TableSubjectInfo";
import { formatHoursMinutes } from "../../../utils/Format/Date";

const TableBody = (props) => {
  const [showInfo, setShowInfo] = useState(false);

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

  return (
    <Fragment>
      <tr className={classes.tableHead} key={props.id}>
        <td>
          {formatHoursMinutes(props.item.startTime).toString() +
            "-" +
            formatHoursMinutes(props.item.endTime).toString()}
        </td>
        <td onClick={extraInfoHandler}>{props.item.subject}</td>
        <td>{joinLecturers(props.item)}</td>
        <td>{joinRooms(props.item)}</td>
      </tr>
      {showInfo && (
        <TableSubjectInfo
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
