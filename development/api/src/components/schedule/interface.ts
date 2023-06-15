import { RowDataPacket } from 'mysql2';

interface Iroom {
 roomId?:number;
  room?:string ;

}
interface Icourse {
  courseId?:number;
  courseCode?:string;
  courseName?:string;
}
interface Ilecturer {
  lecturerId?:number
  firstName?:string
  lastName?:string
}
interface ISchedule extends RowDataPacket {
  id: number;
  startTime: Date;
  endTime: Date;
  rooms: Iroom[] | null;
  comment: string;
  courses: Icourse[] | null;
  subject: {};
  subjectId?: number;
  subjectCode?: string;
  lecturers: Ilecturer[] | null;
  atDate?:Date;
  toDate?:Date;
}

interface IhomeW {
  id?: number;
  description?: string;
  dueDate?: Date | null;
  extrasLink?: string | null;
  subjectCode?: number | null;
  subjects_Id?: number | null;
  dateCreated?: Date;
  dateUpdated?: Date;
  dateDeleted?: Date | null;

}
interface Isubject {
  id?: number;
  subjectCode?: string ;
  subject?: string;

 }
export {
  ISchedule, Iroom, Icourse, Ilecturer, IhomeW, Isubject,
};
