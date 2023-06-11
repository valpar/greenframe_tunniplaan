import { RowDataPacket } from 'mysql2';

interface IRoom extends RowDataPacket {
  id: number;
  room: string;
  dateCreated: Date;
  dateUpdated: Date;
  dateDeleted: Date | null;
}

export default IRoom;
