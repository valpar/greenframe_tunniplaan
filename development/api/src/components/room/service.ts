import { FieldPacket, ResultSetHeader } from 'mysql2';
import pool from '../../database';
import IRoom from './interface';

const roomService = {
  // võtan return false ära
  getAllRooms: async (): Promise<IRoom[]> => {
    console.log('Database Host:', process.env.DB_HOST);
    console.log('Database Port:', process.env.DB_PORT);
    try {
      const [rooms]: [IRoom[], FieldPacket[]] = await pool.query(
        'SELECT * FROM rooms WHERE dateDeleted is NULL',
      );
      return rooms;
    } catch (error) {
      console.error('Database query error:', error);
      throw new Error('Database query failed');
    }
  },
  /* getAllRooms: async (): Promise<IRoom[] | false> => {
    console.log('Database Host:', process.env.DB_HOST);
    console.log('Database Port:', process.env.DB_PORT);
    try {
      const [rooms]: [IRoom[], FieldPacket[]] = await pool.query(
        'SELECT * FROM rooms WHERE dateDeleted is NULL',
      );
      return rooms;
    } catch (error) {
      return false;
    }
  }, */
  getRoomId: async (id: number): Promise<IRoom | false> => {
    try {
      const [room]: [IRoom[], FieldPacket[]] = await pool.query(
        'SELECT room FROM rooms WHERE id = ? AND dateDeleted IS NULL LIMIT 1',
        [id],
      );
      return room[0];
    } catch (error) {
      return false;
    }
  },
  createRoom: async (room: string): Promise<number | false> => {
    try {
      const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query(
        'INSERT INTO rooms SET room = ?',
        [room],
      );
      return result.insertId;
    } catch (error) {
      return false;
    }
  },
  deleteRoom: async (id: number): Promise<boolean> => {
    try {
      await pool.query('UPDATE rooms SET dateDeleted = ? WHERE id = ?', [
        new Date(),
        id,
      ]);
      return true;
    } catch (error) {
      return false;
    }
  },
  updateRoom: async (data: {
    id: number;
    room: string;
  }): Promise<boolean | undefined> => {
    try {
      const [update]: [ResultSetHeader, FieldPacket[]] = await pool.query(
        'UPDATE rooms SET room = ? WHERE id = ?',
        [data.room, data.id],
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

export default roomService;
