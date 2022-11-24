import TableRow from "./TableRow";
import classes from "./Table.module.css";
import { Fragment, useState } from "react";

const Table = (props) => {
  
  const today = props.filteredData
    .filter((e) => e.startTime.includes(props.day));
  const noCourse = today.filter(course => course.courses === "");
  const hasCourses = today.filter(course => course.courses !== "");
    hasCourses.sort((a, b) => {
      if (a.courses && b.courses) {
        if (a.courses[0].courseId < b.courses[0].courseId) return -1;
        if (a.courses[0].courseId > b.courses[0].courseId) return 1;
      }

      return 0;
    });
  const data = [...hasCourses, ...noCourse];  

  return (
    <table className={classes.scheduleTable}>
      <thead>
        <tr className={classes.tableHead}>
          <th>AEG</th>
          <th>ÕPPEAINE</th>
          <th>ÕPPEJÕUD</th>
          <th>RUUM</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index, self) => {
          return (
            <Fragment key={index}>
              {(index === 0 ||
                item.courses[0]?.courseId !==
                  self[index - 1].courses[0]?.courseId) && (
                <tr className={classes.courseRow}>
                  <td colSpan={4} className={classes.courseName}>
                    {item.courses !== ""
                      ? item.courses[0].courseName
                      : item.courses}
                  </td>
                </tr>
              )}
              <TableRow
                admin={props.admin}
                userLecturer={props.userLecturer}
                rawData={props.rawData}
                data={data}
                key={item.id}
                item={item}
                index={index}
                onUpdate={props.onUpdate}
              />
            </Fragment>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
