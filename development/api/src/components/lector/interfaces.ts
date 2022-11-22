// Interfaces

import { RowDataPacket } from "mysql2";

interface ILector extends RowDataPacket {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  dateCreated: Date;
  dateUpdated: Date;
  dateDeleted: Date | null;
}
interface INewLector {
  firstName: string;
  lastName: string;
  email: string;
}
interface ILecturerSubjects extends RowDataPacket {
  fullName: string;
  activeSubjects: number;
}

export { ILector, INewLector, ILecturerSubjects };
