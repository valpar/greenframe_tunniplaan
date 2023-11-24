import { RowDataPacket } from 'mysql2';

interface INewUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'Admin' | 'User';
}

interface IUser extends INewUser, RowDataPacket {
  id: number;
  dateCreated: Date;
  dateUpdated: Date;
  dateDeleted: Date | null;
}

interface IUpdateUser {
  id: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  role?: 'admin' | 'user'| 'lecturer'| 'student';
}

export { IUser, IUpdateUser, INewUser };
