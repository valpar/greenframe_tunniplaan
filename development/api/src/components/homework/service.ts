import { RowDataPacket, FieldPacket, ResultSetHeader } from 'mysql2';
import pool from '../../database.ts';
import Ihomework from './interface.ts';
// import ISubject from "./interface";

const homeworkService = {
  getAllhomeworks: async (): Promise<Ihomework[] | false> => {
    try {
      const [homeworks]: [Ihomework[], FieldPacket[]] = await pool.query(
        'SELECT homeworks.id, subjects.subjectCode, subjects.id as subjects_id, subjects.subject, homeworks.description, homeworks.dueDate, homeworks.extrasLink, homeworks.dateCreated, homeworks.dateUpdated, homeworks.dateDeleted FROM scheduleDb.homeworks left join subjects ON homeworks.subjects_id = subjects.Id where homeworks.dateDeleted IS NULL order BY homeworks.id;',
      );
      return homeworks;
    } catch (error) {
      return false;
    }
  },
  gethomeworkId: async (
    id: number,
  ): Promise<Ihomework[] | false | undefined> => {
    try {
      const homework: [Ihomework[], FieldPacket[]] = await pool.query(
        'SELECT homeworks.id, subjects.subjectCode, subjects.id as subjects_id, subjects.subject, homeworks.description, homeworks.dueDate, homeworks.extrasLink,homeworks.dateCreated, homeworks.dateUpdated, homeworks.dateDeleted FROM scheduleDb.homeworks left join subjects ON homeworks.subjects_id = subjects.Id WHERE homeworks.id = ? AND homeworks.dateDeleted IS NULL LIMIT 1',
        [id],
      );
      // console.log("proovime id järgi leida kodutööd");
      if (homework[0][0] !== undefined) {
        return homework[0];
      }
      return false;
    } catch (error) {
      return false;
    }
  },
  createhomework: async (
    description: string,
    dueDate: string,
    subjectsId: number,
    extrasLink: string,
  ): Promise<number | false | undefined> => {
    try {
      // console.log(
      //   "createHomework",
      //   description,
      //   dueDate,
      //   subjects_id,
      //   extrasLink
      // );
      const [id]: [ResultSetHeader, FieldPacket[]] = await pool.query(
        'INSERT INTO homeworks (description, dueDate, subjects_id, extrasLink) VALUES (?, ?, ?, ?)',
        [description, dueDate, subjectsId, extrasLink],
      );
      return id.insertId;
    } catch (error) {
      // console.log(error);
      return false;
    }
  },
  deletehomework: async (id: number): Promise<boolean | undefined> => {
    try {
      const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query(
        'UPDATE homeworks SET dateDeleted = ? WHERE id = ?',
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
  updatehomework: async (
    id: number,
    description: string,
    dueDate: string,
    subjectsId: number,
    extrasLink: string,
  ): Promise<boolean | undefined> => {
    try {
      const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query(
        'UPDATE homeworks SET description = ?, dueDate = ?, subjects_id = ? , extrasLink = ? WHERE id = ?',
        [description, dueDate, subjectsId, extrasLink, id],
      );
      if (result.affectedRows > 0) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
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
  gethomeworkBySubjectCode: async (
    subCode: string | undefined,
    actualDate: string,
  ): Promise<Ihomework[] | false | undefined> => {
    try {
      // const homework: [Ihomework[], FieldPacket[]] = await pool.query(
      //   `SELECT homeworks.id, homeworks.description,
      // homeworks.dueDate, homeworks.extrasLink, homeworks.dateCreated, homeworks.dateUpdated,
      //   homeworks.dateDeleted FROM scheduleDb.homeworks
      //   WHERE subjects_id = (select id from subjects where subjectCode = ? )
      //         AND homeworks.dueDate > (select scheduled.startTime from scheduleDb.scheduled
      //          WHERE scheduled.subjects_id = (select id from subjects where subjectCode = ? )
      //         AND scheduled.startTime < ? order by scheduled.startTime desc limit 1)
      //         AND homeworks.dueDate <=      (select scheduled.startTime from scheduleDb.scheduled
      //          WHERE scheduled.subjects_id = (select id from subjects where subjectCode = ? )
      //         AND scheduled.startTime > ? order by scheduled.startTime LIMIT 1 ) `,
      //   [subCode, subCode, actualDate, subCode, actualDate]
      // );
      const homework: [Ihomework[], FieldPacket[]] = await pool.query(
        `SELECT homeworks.id, homeworks.description, homeworks.dueDate, homeworks.extrasLink, homeworks.dateCreated, homeworks.dateUpdated, 
        homeworks.dateDeleted FROM scheduleDb.homeworks 
        WHERE subjects_id = (select id from subjects where subjectCode = ? )
              AND homeworks.dueDate > (select scheduled.startTime from scheduleDb.scheduled 
                                        WHERE scheduled.subjects_id = (select id from subjects where subjectCode = ? ) 
                                        AND scheduled.startTime < ? 
                                        AND homeworks.dateDeleted is NULL order by scheduled.startTime desc limit 1) `,
        [subCode, subCode, actualDate, subCode, actualDate],
      );
      // console.log(actualDate, subCode);
      if (homework[0][0] !== undefined) {
        return homework[0];
      }
      return false;
    } catch (error) {
      // console.log(error);
      return false;
    }
  },
};

export default homeworkService;
