import { RowDataPacket } from 'mysql2';

interface ITeacher extends RowDataPacket {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  dateCreated: Date;
  dateUpdated: Date;
  dateDeleted: Date | null;
}
interface INewTeacher {
  firstName: string;
  lastName: string;
  email: string;
}
interface ITeacherSubjects extends RowDataPacket {
  fullName: string;
  activeSubjects: number;
}

export { ITeacher, INewTeacher, ITeacherSubjects };
