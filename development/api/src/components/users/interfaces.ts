// import { RowDataPacket } from 'mysql2';

interface IUser {
  id: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  roles?: string[]; // stringide massiiv
}

export default IUser;
