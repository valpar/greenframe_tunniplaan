import { INewUser, IUpdateUser, IUser } from "./interfaces";
import hashService from "../general/services/hashService";
import pool from "../../database";
import { FieldPacket, ResultSetHeader } from "mysql2";
import { off } from "process";

const userService = {
  getAllUsers: async (): Promise<IUser[] | false> => {
    try {
      const [users]: [IUser[], FieldPacket[]] = await pool.query(
        "SELECT id, firstName, lastName, email, role FROM users WHERE dateDeleted is NULL"
      );
      return users;
    } catch (error) {
      return false;
    }
  },
  getUserById: async (id: number): Promise<IUser | false | undefined> => {
    try {
      const [user]: [IUser[], FieldPacket[]] = await pool.query(
        "SELECT id, firstName, lastName, email, role, dateCreated, dateUpdated, dateDeleted  FROM users WHERE id = ? AND dateDeleted is NULL LIMIT 1",
        [id]
      );
      if (user[0] !== undefined) {
        return user[0];
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  getUserByEmail: async (email: string): Promise<IUser | false | undefined> => {
    try {
      const [user]: [IUser[], FieldPacket[]] = await pool.query(
        "SELECT firstName, lastName, email, role FROM users WHERE email = ? AND dateDeleted is NULL",
        [email]
      );
      if (user[0] !== undefined) {
        return user[0];
      }
    } catch (error) {
      return false;
    }
  },
  createUser: async (newUser: INewUser): Promise<number | false> => {
    try {
      const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query(
        "INSERT INTO users SET ?",
        [newUser]
      );
      return result.insertId;
    } catch (error) {
      return false;
    }
  },
  updateUserById: async (updateUser: any): Promise<boolean | undefined> => {
    try {
      const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query(
        "UPDATE users SET ? WHERE Id = ?",
        [updateUser, updateUser.id]
      );
      if (result.affectedRows > 0) {
        return true; 
      }} catch (error) {
        return false;
      }
    },
  deleteUser: async (id: number): Promise<boolean | undefined> => {
    try {
      const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query(
        "UPDATE users SET dateDeleted = ?, email = CONCAT('deleted',email) WHERE id = ?",
        [new Date(), id]
      );
      if (result.affectedRows > 0) {
        return true;
      }
    } catch (error) {
      return false;
    }
  },
};

export default userService;
