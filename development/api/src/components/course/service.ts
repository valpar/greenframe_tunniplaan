import { FieldPacket, ResultSetHeader } from 'mysql2';
import pool from '../../database.ts';
import ICourse from './interface.ts';

const courseService = {
  getAllCourses: async (): Promise<ICourse[] | false> => {
    try {
      const [courses]: [ICourse[], FieldPacket[]] = await pool.query(
        'SELECT id AS id, course AS courseCode, courseLong AS courseName  FROM courses WHERE dateDeleted IS NULL',
      );
      return courses;
    } catch (error) {
      return false;
    }
  },
  getCourseId: async (id: number): Promise<ICourse[] | false | undefined> => {
    try {
      const course: [ICourse[], FieldPacket[]] = await pool.query(
        'SELECT course AS courseCode, courseLong AS courseName FROM courses WHERE id = ? AND dateDeleted IS NULL LIMIT 1',
        [id],
      );
      if (course[0][0] !== undefined) {
        return course[0];
      }
      return false;
    } catch (error) {
      return false;
    }
  },
  createCourse: async (course: string, courseLong: string): Promise<number | false | undefined> => {
    try {
      const [id]: [ResultSetHeader, FieldPacket[]] = await pool.query(
        'INSERT INTO courses (course, courseLong) VALUES (?,?)',
        [course, courseLong],
      );
      return id.insertId;
    } catch (error) {
      return false;
    }
  },
  deleteCourse: async (id: number): Promise<boolean | undefined> => {
    try {
      const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query(
        'UPDATE courses SET dateDeleted = ? WHERE id = ?',
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
  updateCourse:
    async (id: number, courseCode: string, courseName: string): Promise<boolean | undefined> => {
      try {
        const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query(
          'UPDATE courses SET course = ?, courseLong = ? WHERE id = ?',
          [courseCode, courseName, id],
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

export default courseService;
