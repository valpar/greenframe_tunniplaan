import { FieldPacket, ResultSetHeader, RowDataPacket } from 'mysql2';
import pool from '../../database';
import {
  ISchedule, Iroom, Iteacher, Icourse, IhomeW, Isubject,
} from './interface';
import homeworkService from '../homework/service';

const scheduleService = {
  getEntireSchedule: async (atDate:string, toDate:string): Promise<ISchedule[] | false> => {
    try {
      console.log(`Schedule: DB_Host: ${process.env.DB_HOST}:${process.env.DB_PORT}`);
      const [schedule]: [ISchedule[], FieldPacket[]] = await pool.query(`
      SELECT distinct scheduled.id AS id, scheduled.startTime AS startTime, scheduled.endTime AS endTime, 
        subjects.id AS  subjectId, subjects.subjectCode AS subjectCode, subjects.subject AS subjectdescription, scheduled.distanceLink AS distanceLink, scheduled.comment, 
        group_concat( DISTINCT teachers.id ORDER BY teachers.id) As strTeachersId,
        group_concat( DISTINCT teachers.firstName ORDER BY teachers.id) As strTeachersFirstName,
        group_concat( DISTINCT teachers.lastName ORDER BY teachers.id) As strTeachersLastName,
        group_concat( DISTINCT courses.id ORDER BY courses.id) AS strCoursesId,
        group_concat( DISTINCT courses.course ORDER BY courses.id) AS strCourses,
        group_concat( DISTINCT courses.courseLong ORDER BY courses.id) AS strCoursesName,    
        group_concat( DISTINCT rooms.id ORDER BY rooms.id) as strRoomsId,
        group_concat( DISTINCT rooms.room ORDER BY rooms.id) as strRooms
      FROM scheduled left JOIN
        subjects ON scheduled.subjects_id = subjects.id left JOIN
        scheduled_has_teachers ON scheduled.id = scheduled_has_teachers.schedule_id left JOIN
        teachers ON scheduled_has_teachers.teachers_id = teachers.id left JOIN
        scheduled_has_courses ON scheduled.id = scheduled_has_courses.scheduled_id left JOIN
        courses ON scheduled_has_courses.courses_id = courses.id left JOIN
        scheduled_has_rooms ON scheduled.id = scheduled_has_rooms.scheduled_id left JOIN
        rooms ON scheduled_has_rooms.rooms_id = rooms.id
      WHERE scheduled.startTime >= ? AND scheduled.startTime <= DATE_ADD(?, INTERVAl 1 DAY) 
      AND scheduled.dateDeleted IS NULL
      GROUP BY id, startTime, endTime, scheduled.comment, subjects.id, subjects.subjectCode, subjects.subject, scheduled.distanceLink
      ORDER BY scheduled.startTime ;`, [atDate, toDate]);
      let i = 0;
      while (i < schedule.length) {
        const objSubject: Isubject = {};
        objSubject.id = schedule[i].subjectId;
        objSubject.subjectCode = schedule[i].subjectCode;
        objSubject.subject = schedule[i].subjectdescription;
        schedule[i].subject = objSubject;
        delete schedule[i].subjectId;
        delete schedule[i].subjectdescription;

        const { subjectCode } = schedule[i];
        const actualDate = schedule[i].startTime.toISOString().slice(0, 11).replace('T', ' ');

        // eslint-disable-next-line no-await-in-loop
        const homework = await homeworkService.gethomeworkBySubjectCode(subjectCode, actualDate);

        if (homework) {
          const arrHomeworks = []; let h = 0;
          while (h < homework.length) {
            const objHomework: IhomeW = {};
            objHomework.id = homework[h].id;
            objHomework.description = homework[h].description;
            objHomework.dueDate = homework[h].dueDate;
            objHomework.extrasLink = homework[h].extrasLink;
            objHomework.dateCreated = homework[h].dateCreated;
            objHomework.dateUpdated = homework[h].dateUpdated;
            objHomework.dateDeleted = homework[h].dateDeleted;
            arrHomeworks.push(objHomework);
            h += 1;
          }
          schedule[i].homeworks = arrHomeworks;
        }

        let arrRooms = [];
        if (schedule[i].strRoomsId) {
          const tmpArrRoomId = schedule[i].strRoomsId.split(',');
          const tmpArrRoomVal = schedule[i].strRooms.split(',');
          let n = 0;
          arrRooms = [];
          while (n < tmpArrRoomId.length) {
            const objRoom:Iroom = {};
            objRoom.roomId = Number(tmpArrRoomId[n]);
            objRoom.room = tmpArrRoomVal[n];
            arrRooms.push(objRoom);
            n += 1;
          }
          schedule[i].rooms = arrRooms;
        } else {
          schedule[i].rooms = null;
        }

        if (schedule[i].strCoursesId) {
          const tmpArrCoursesId = schedule[i].strCoursesId.split(',');
          const tmpArrCoursesVal = schedule[i].strCourses.split(',');
          const tmpArrCoursesName = schedule[i].strCoursesName.split(',');
          let n = 0;
          const arrCourses = [];
          while (n < tmpArrCoursesId.length) {
            const objCourse:Icourse = {};
            objCourse.courseId = tmpArrCoursesId[n] * 1;
            objCourse.courseCode = tmpArrCoursesVal[n];
            objCourse.courseName = tmpArrCoursesName[n];
            arrCourses.push(objCourse);

            n += 1;
          }
          schedule[i].courses = arrCourses;
        } else {
          schedule[i].courses = null;
        }

        if (schedule[i].strTeachersId) {
          const tmpArrTeachersId = schedule[i].strTeachersId.split(',');
          const tmpArrTeachersFirst = schedule[i].strTeachersFirstName.split(',');
          const tmpArrTeachersLast = schedule[i].strTeachersLastName.split(',');

          let n = 0; const arrTeachers = [];

          while (n < tmpArrTeachersId.length) {
            const objTeacher:Iteacher = {};
            objTeacher.teacherId = tmpArrTeachersId[n] * 1;
            objTeacher.firstName = tmpArrTeachersFirst[n];
            objTeacher.lastName = tmpArrTeachersLast[n];
            arrTeachers.push(objTeacher);

            n += 1;
          }
          schedule[i].teachers = arrTeachers;
        } else {
          schedule[i].teachers = null;
        }

        delete schedule[i].subjectCode;
        delete schedule[i].strRoomsId;
        delete schedule[i].strRooms;
        delete schedule[i].strCoursesId;
        delete schedule[i].strCourses;
        delete schedule[i].strCoursesName;
        delete schedule[i].strTeachersId;
        delete schedule[i].strTeachersFirstName;
        delete schedule[i].strTeachersLastName;
        i += 1;
      }
      return schedule;
    } catch (error) {
      /* eslint-disable no-console */
      console.log(error);
      /* eslint-enable no-console */
      return false;
    }
  },

  // ----------------------
  createSchedule: async (
    startTime:string,
    endTime:string,
    rooms: Array<Iroom>,
    comment:string,
    courses: Array<Icourse>,
    subject:number,
    teachers: Array<Iteacher>,
    distanceLink:string,
  ): Promise<number | false> => {
    let createdscheduleId: number;

    try {
      const [createdChedule]: [ResultSetHeader, FieldPacket[]] = await pool.query(
        `INSERT INTO scheduled 
        (startTime, endTime, comment, subjects_id, distanceLink) VALUES
        ( ?,?,?,?,?);`,
        [startTime, endTime, comment, subject, distanceLink],
      );
      createdscheduleId = createdChedule.insertId;
    } catch (error) {
      return false;
    }

    // Järgnevalt väljakommenteeritud kood on ESLint-i rakendamisel
    // ümber kirjutatud, kuid on alles jäetud
    // juhuks, kui testimisel selgub, et uus kood ei tööta.

    /* for (var index in rooms) {
      // console.log("uus kirje sceduled:", createdscheduleId, " Rooms_id:", rooms[index].roomId);
      try {
        const [createdChedule]: [ResultSetHeader, FieldPacket[]] =
          await pool.query(`INSERT INTO scheduled_has_rooms (scheduled_id, rooms_id)
        VALUES ('?', '?');`, [createdscheduleId, rooms[index].roomId]);
      } catch (error) {
        return false;
      }
    } */

    // When using forEach with asynchronous operations (like database queries inside the loop),
    // the forEach loop does not wait for these operations to complete before moving on.
    // This can lead to unexpected behavior

    // Eelnev väljakommenteeritud kood ümber kirjutatud järgnevaga:
    if (typeof rooms !== 'string') {
      rooms.forEach(async (room) => {
        try {
          const query = `
          INSERT INTO scheduled_has_rooms (scheduled_id, rooms_id)
            VALUES (?, ?);
        `;
          await pool.query(query, [createdscheduleId, room.roomId]);
          return true;
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(`An error occurred while inserting room ${room.roomId}:`, error);
          return false;
        }
      });
    }

    /* for (var index in courses) {
      try {
        const [createdChedule]: [ResultSetHeader, FieldPacket[]] =
          await pool.query(`INSERT INTO scheduled_has_courses (scheduled_id, courses_id)
        VALUES ('?', '?');`, [createdscheduleId, courses[index].courseId]);
      } catch (error) {
        return false;
      }
    } */

    // Eelnev väljakommenteeritud kood ümber kirjutatud järgnevaga:
    if (typeof courses !== 'string') {
      courses.forEach(async (course) => {
        const query = `
          INSERT INTO scheduled_has_courses (scheduled_id, courses_id)
            VALUES (?, ?);`;
        try {
          await pool.query(query, [createdscheduleId, course.courseId]);
          return true;
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(`An error occurred while inserting course ${course.courseId}:`, error);
          return false;
        }
      });
    }

    /* for (var index in teachers) {
      try {
        const [createdChedule]: [ResultSetHeader, FieldPacket[]] =
          await pool.query(`INSERT INTO scheduled_has_teachers (schedule_id, teachers_id)
        VALUES ('?', '?');`, [createdscheduleId, teachers[index].teacherId]);
      } catch (error) {
        return false;
      }
    } */

    // Eelnev väljakommenteeritud kood ümber kirjutatud järgnevaga:
    if (typeof teachers !== 'string') {
      teachers.forEach(async (teacher) => {
        const query = `
          INSERT INTO scheduled_has_teachers (schedule_id, teachers_id)
            VALUES (?, ?);`;
        try {
          await pool.query(query, [createdscheduleId, teacher.teacherId]);
          return true;
        } catch (error) {
        // eslint-disable-next-line no-console
          console.error(`An error occurred while inserting teacher ${teacher.teacherId}:`, error);
          return false;
        }
      });
    }

    return createdscheduleId;
  },

  // ----------------------
  updateSchedule: async (
    id:number,
    startTime:string,
    endTime:string,
    rooms: Array<Iroom>,
    comment:string,
    courses: Array<Icourse>,
    subject:number,
    teachers: Array<Iteacher>,
    distanceLink:string,
  ): Promise<number | false> => {
    let updatedRows: number;

    try {
      const [updatedSchedule]: [ResultSetHeader, FieldPacket[]] = await pool.query(
        `UPDATE scheduled
          SET startTime = ?, endTime = ?, comment = ?, subjects_id = ?, distanceLink = ?  
          WHERE id = ?;`,
        [startTime, endTime, comment, subject, distanceLink, id],
      );
      updatedRows = updatedSchedule.affectedRows;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('An error occurred while updating schedule', error);
      return false;
    }

    try {
      await pool.query(
        'DELETE FROM scheduled_has_rooms WHERE scheduled_id = ?;',
        [id],
      );
    } catch (error) {
      return false;
    }

    /* for (var index in rooms) {
      // console.log("uus kirje sceduled:", id, " Rooms_id:", rooms[index].roomId);
      try {
        const [createdChedule]: [ResultSetHeader, FieldPacket[]] =
          await pool.query(`INSERT INTO scheduled_has_rooms (scheduled_id, rooms_id)
        VALUES ('?', '?');`, [id, rooms[index].roomId]);
      } catch (error) {
        // console.log(error);
        return false;
      }
    } */

    if (typeof rooms !== 'string') {
      rooms.forEach(async (room) => {
        const query = `
          INSERT INTO scheduled_has_rooms (scheduled_id, rooms_id)
            VALUES (?, ?);
      `;
        try {
          await pool.query(query, [id, room.roomId]);
          return true;
        } catch (error) {
          return false;
        }
      });
    }
    try {
      await pool.query(
        'DELETE FROM scheduled_has_courses WHERE scheduled_id = ?;',
        [id],
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('An error occurred while deleting courses', error);
      return false;
    }

    // console.log(courses);
    /* for (var index in courses) {
      console.log('uus kirje sceduled:', id, ' courses_id:', courses[index].courseId);
      try {
        const [createdChedule]: [ResultSetHeader, FieldPacket[]] =
          await pool.query(`INSERT INTO scheduled_has_courses (scheduled_id, courses_id)
        VALUES ('?', '?');`, [id, courses[index].courseId]);
      } catch (error) {
        // console.log(error);
        return false;
      }
    } */

    try {
      await pool.query(
        'DELETE FROM scheduled_has_teachers WHERE schedule_id = ?;',
        [id],
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('An error occurred while deleting teachers', error);
      return false;
    }

    if (typeof courses !== 'string') {
      courses.forEach(async (course) => {
        const query = `
          INSERT INTO scheduled_has_courses (scheduled_id, courses_id)
            VALUES (?, ?);`;
        try {
          await pool.query(query, [id, course.courseId]);
          return true;
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(`An error occurred while updating course ${course.courseId}:`, error);
          return false;
        }
      });
    }
    /* for (var index in teachers) {
      // console.log("uus kirje sceduled:", id, " teachers_id:", teachers[index].lecturerId);
    /* for (var index in teachers) {
      // console.log("uus kirje sceduled:", id, " teachers_id:", teachers[index].teacherId);
      try {
        const [createdChedule]: [ResultSetHeader, FieldPacket[]] =
          await pool.query(`INSERT INTO scheduled_has_teachers (schedule_id, teachers_id)
        VALUES ('?', '?');`, [id, teachers[index].teacherId]);
      } catch (error) {
        // console.log(error);
        return false;
      }
    } */
    if (typeof teachers !== 'string') {
      teachers.forEach(async (teacher) => {
        const query = `
          INSERT INTO scheduled_has_teachers (schedule_id, teachers_id)
          VALUES (?, ?);
        `;
        try {
          await pool.query(query, [id, teacher.teacherId]);
          return true;
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(`An error occurred while inserting teacher ${teacher.teacherId}:`, error);
          return false;
        }
      });
    }

    return updatedRows;
  },

  getSubjectByCode: async (code: string): Promise<any> => {
    try {
      const [subject]: [RowDataPacket[][], FieldPacket[]] = await pool.query(
        'SELECT id FROM subjects WHERE subjectCode = ? AND dateDeleted is NULL',
        [code],
      );
      return subject[0];
    } catch (error) {
      return false;
    }
  },

  getgcal: async (atDate:string, toDate:string, courseId:number, teacherId:number):
  Promise<ISchedule[] | false> => {
    let isCourse = '%';
    let isLecture = '%';
    isCourse = courseId === 0 ? '%' : '';
    isLecture = teacherId === 0 ? '%' : '';

    try {
      const [schedule]: [ISchedule[], FieldPacket[]] = await pool.query(`
      SELECT distinct scheduled.id AS id, scheduled.startTime AS startTime, scheduled.endTime AS endTime, 
        subjects.subjectCode AS subjectCode, subjects.subject AS subject, scheduled.distanceLink AS distanceLink, scheduled.comment, 
        group_concat( DISTINCT teachers.id ORDER BY teachers.id) As strTeachersId,
        group_concat( DISTINCT courses.id ORDER BY courses.id) AS strCoursesId,
        group_concat( DISTINCT rooms.id ORDER BY rooms.id) as strRoomsId
        FROM scheduled left JOIN
        subjects ON scheduled.subjects_id = subjects.id left JOIN
        scheduled_has_teachers ON scheduled.id = scheduled_has_teachers.schedule_id left JOIN
        teachers ON scheduled_has_teachers.teachers_id = teachers.id left JOIN
        scheduled_has_courses ON scheduled.id = scheduled_has_courses.scheduled_id left JOIN
        courses ON scheduled_has_courses.courses_id = courses.id left JOIN
        scheduled_has_rooms ON scheduled.id = scheduled_has_rooms.scheduled_id left JOIN
        rooms ON scheduled_has_rooms.rooms_id = rooms.id
        WHERE scheduled.startTime >= ? AND scheduled.startTime <= DATE_ADD(?, INTERVAl 1 DAY) AND (courses.id = ? OR "%" = ?) AND (teachers.id = ? OR "%" = ?)
        AND scheduled.dateDeleted IS NULL
        GROUP BY id, startTime, endTime, scheduled.comment, subjects.subjectCode, subjects.subject, scheduled.distanceLink
        ORDER BY scheduled.startTime ;`, [atDate, toDate, courseId, isCourse, teacherId, isLecture]);

      // console.log(atDate, toDate, courseId, teacherId);
      // console.log(schedule);
      return schedule;

      // AND courses.id = ? AND teachers.id = ?
    } catch (error) {
      // console.log(error);
      return false;
    }
  },

  deleteSchedule: async (id: number): Promise<boolean | undefined> => {
    try {
      const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query(
        'UPDATE scheduled SET dateDeleted = ? WHERE id = ?',
        [new Date(), id],
      );
      if (result.affectedRows > 0) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  },

};

export default scheduleService;
