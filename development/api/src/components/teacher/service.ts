import { FieldPacket, ResultSetHeader } from 'mysql2';
import pool from '../../database';
import { ITeacher, INewTeacher, ITeacherSubjects } from './interfaces';

const teacherService = {
  getAllTeachers: async (): Promise<ITeacher[] | false> => {
    try {
      const [teachers]: [ITeacher[], FieldPacket[]] = await pool.query(
        'SELECT * FROM teachers WHERE dateDeleted IS NULL',
      );
      return teachers;
    } catch (error) {
      // console.log(error);
      return false;
    }
  },
  getTeachersSubjects: async (): Promise<ITeacherSubjects[] | false> => {
    try {
      const [activeSubjects]: [ITeacherSubjects[], FieldPacket[]] = await pool.query(
        `SELECT CONCAT(teachers.firstName," ",teachers.lastName) AS fullName,
          (SELECT GROUP_CONCAT(subject) FROM subjects 
          WHERE teachers.id = teachers_id) AS activeSubjects 
          FROM teachers INNER JOIN subjects ON teachers.id = subjects.teachers_id 
          WHERE teachers.dateDeleted IS NULL 
          GROUP BY fullName, activeSubjects ORDER BY activeSubjects DESC;`,
      );
      return activeSubjects;
    } catch (error) {
      return false;
    }
  },
  getTeacherById: async (
    id: number,
  ): Promise<ITeacher[] | false | undefined> => {
    try {
      const teacher: [ITeacher[], FieldPacket[]] = await pool.query(
        'SELECT firstName, lastName FROM teachers WHERE id = ? AND dateDeleted IS NULL',
        [id],
      );
      if (teacher[0][0] !== undefined) {
        return teacher[0];
      }
      return false;
    } catch (error) {
      return false;
    }
  },
  deleteTeacherById: async (
    id: number,
  ): Promise<number | false | undefined> => {
    try {
      const [index]: [ResultSetHeader, FieldPacket[]] = await pool.query(
        'UPDATE teachers SET dateDeleted = ? WHERE dateDeleted IS NULL AND id = ?',
        [new Date(), id],
      );
      if (index.affectedRows > 0) {
        return index.affectedRows;
      }
      return false;
    } catch (error) {
      return false;
    }
  },
  createTeacher: async (newTeacher: INewTeacher): Promise<number | false> => {
    try {
      const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query(
        'INSERT INTO teachers SET ? ',
        [{ ...newTeacher }],
      );
      return result.insertId;
    } catch (error) {
      return false;
    }
  },
  updateTeacherById: async (
    newTeacher: INewTeacher,
    id: number,
  ): Promise<boolean | undefined> => {
    try {
      const [update]: [ResultSetHeader, FieldPacket[]] = await pool.query(
        'UPDATE teachers SET ? WHERE id = ?',
        [{ ...newTeacher }, id],
      );
      if (update.affectedRows > 0) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  },
};

export default teacherService;
