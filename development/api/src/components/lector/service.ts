import { FieldPacket, ResultSetHeader } from "mysql2";
import pool from "../../database";
import { ILector, INewLector, ILecturerSubjects } from "./interfaces";

const lecturerService = {
  getAllLecturers: async (): Promise<ILector[] | false> => {
    try {
      const [lecturers]: [ILector[], FieldPacket[]] = await pool.query(
        "SELECT * FROM lecturers WHERE dateDeleted IS NULL"
      );
      return lecturers;
    } catch (error) {
      // console.log(error);
      return false;
    }
  },
  getLecturersSubjects: async (): Promise<ILecturerSubjects[] | false> => {
    try {
      const [activeSubjects]: [ILecturerSubjects[], FieldPacket[]] =
        await pool.query(
          `SELECT CONCAT(lecturers.firstName," ",lecturers.lastName) AS fullName,
          (SELECT GROUP_CONCAT(subject) FROM subjects 
          WHERE lecturers.id = lecturers_id) AS activeSubjects 
          FROM lecturers INNER JOIN subjects ON lecturers.id = subjects.lecturers_id 
          WHERE lecturers.dateDeleted IS NULL 
          GROUP BY fullName, activeSubjects ORDER BY activeSubjects DESC;`
        );
      return activeSubjects;
    } catch (error) {
      return false;
    }
  },
  getLecturerById: async (
    id: number
  ): Promise<ILector[] | false | undefined> => {
    try {
      const lecturer: [ILector[], FieldPacket[]] = await pool.query(
        "SELECT firstName, lastName FROM lecturers WHERE id = ? AND dateDeleted IS NULL",
        [id]
      );
      if (lecturer[0][0] !== undefined) {
        return lecturer[0];
      }
    } catch (error) {
      return false;
    }
  },
  deleteLecturerById: async (
    id: number
  ): Promise<number | false | undefined> => {
    try {
      const [index]: [ResultSetHeader, FieldPacket[]] = await pool.query(
        "UPDATE lecturers SET dateDeleted = ? WHERE dateDeleted IS NULL AND id = ?",
        [new Date(), id]
      );
      if (index.affectedRows > 0) {
        return index.affectedRows;
      }
    } catch (error) {
      return false;
    }
  },
  createlecturer: async (newLecturer: INewLector): Promise<number | false> => {
    try {
      const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query(
        "INSERT INTO lecturers SET ? ",
        [{ ...newLecturer }]
      );
      return result.insertId;
    } catch (error) {
      return false;
    }
  },
  updateLecturerById: async (
    newLecturer: INewLector,
    id: number
  ): Promise<boolean | undefined> => {
    try {
      const [update]: [ResultSetHeader, FieldPacket[]] = await pool.query(
        "UPDATE lecturers SET ? WHERE id = ?",
        [{ ...newLecturer }, id]
      );
      if (update.affectedRows > 0) {
        return true;
      }
    } catch (error) {
      return false;
    }
  },
};

export default lecturerService;
