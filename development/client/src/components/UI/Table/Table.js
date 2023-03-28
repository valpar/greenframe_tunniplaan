import TableRow from "./TableRow";
import { Fragment } from "react";

const Table = (props) => {
  const today = props.filteredData.filter((e) =>
    e.startTime.includes(props.day)
  );
  const noCourse = today.filter((course) => course.courses === "");
  const oneCourse = today.filter((course) => course.courses?.length === 1);
  const hasCourses = [...oneCourse];
  today.filter((course) => {
    const coursesArr = [];
    if (course.courses?.length > 1) {
      let courceCopy;
      for (let i = 0; i < course.courses.length; i++) {
        courceCopy = { ...course };
        courceCopy.courses = [course.courses[i]];
        coursesArr.push(courceCopy);
      }
      hasCourses.push(...coursesArr);
    }
    return course.courses?.length > 1 ? coursesArr : false;
  });

  hasCourses.sort((a, b) => {
    if (a.courses && b.courses) {
      if (a.courses[0].courseId < b.courses[0].courseId) return -1;
      if (a.courses[0].courseId > b.courses[0].courseId) return 1;
    }

    return 0;
  });
  const data = [...hasCourses, ...noCourse];

  return (
    <table className="table-auto w-full shadow">
      <thead>
        <tr className="text-xs md:text-base border h-12 border-borderGray divide-x divide-borderGray text-left">
          <th className="px-2 md:px-3">AEG</th>
          <th className="px-2 md:px-3">ÕPPEAINE</th>
          <th className="px-2 md:px-3">ÕPPEJÕUD</th>
          <th className="px-2 md:px-3">RUUM</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index, self) => {
          return (
            <Fragment key={index}>
              {(index === 0 ||
                item.courses[0]?.courseId !==
                  self[index - 1].courses[0]?.courseId) && (
                <tr className="text-xs md:text-base border border-borderGray text-left font-bold h-12 bg-lightGray">
                  <td colSpan={4} className="pl-2 md:pl-3">
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
                isLoggedIn={props.isLoggedIn}
              />
            </Fragment>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
