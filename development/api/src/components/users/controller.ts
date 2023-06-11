/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { Request, Response } from 'express';
import responseCodes from '../general/responseCodes';
import { INewUser } from './interfaces';
import userService from './service';

const userController = {
  getAllUsers: async (req: Request, res: Response) => {
    const users = await userService.getAllUsers();
    if (users) {
      return res.status(responseCodes.ok).json({
        users,
      });
    }
    return res.status(responseCodes.ServerError).json({
      error: 'Server error',
    });
  },
  getUserById: async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    const user = await userService.getUserById(id);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: 'No valid id provided',
      });
    }
    // if (id === res.locals.user.id || res.locals.user.role === "Admin") {
    if (user === undefined) {
      return res.status(responseCodes.badRequest).json({
        error: `No user found with id: ${id}`,
      });
    }
    if (!user) {
      return res.status(responseCodes.ServerError).json({
        error: 'Server error',
      });
    }
    return res.status(responseCodes.ok).json({
      user,
    });
    // }
    // return res.status(responseCodes.badRequest).json({
    //   error: `You have no permission for this`,
    // });
  },
  deleteUser: async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: 'No valid id provided',
      });
    }
    const userExists = await userService.deleteUser(id);
    if (userExists === undefined) {
      return res.status(responseCodes.badRequest).json({
        message: `User not found with id: ${id}`,
      });
    }
    if (!userExists) {
      return res.status(responseCodes.ServerError).json({
        error: 'Server error',
      });
    }

    return res.status(responseCodes.noContent).send();
  },

  addUser: async (req: Request, res: Response) => {
    const {
      firstName, lastName, role, email,
    } = req.body;
    if (!firstName) {
      return res.status(responseCodes.badRequest).json({
        error: 'First name is required',
      });
    }
    if (!lastName) {
      return res.status(responseCodes.badRequest).json({
        error: 'Last name is required',
      });
    }
    if (!role) {
      return res.status(responseCodes.badRequest).json({
        error: 'Role is required',
      });
    }
    if (!email) {
      return res.status(responseCodes.badRequest).json({
        error: 'Email is required',
      });
    }
    const newUser: INewUser = {
      firstName,
      lastName,
      email,
      role,
    };
    const id = await userService.createUser(newUser);
    if (!id) {
      return res.status(responseCodes.ServerError).json({
        error: 'Server error',
      });
    }
    return res.status(responseCodes.created).json({
      id,
    });
  },
  updateUserById: async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    const {
      firstName, lastName, email, role,
    } = req.body;
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: 'No valid id provided',
      });
    }
    if (!firstName && !lastName && !email && !role) {
      return res.status(responseCodes.badRequest).json({
        error: 'Nothing to update',
      });
    }
    const updateUser: any = {
      id,
      firstName,
      lastName,
      email,
      role,
    };
    const userExists = await userService.updateUserById(updateUser);
    if (userExists === undefined) {
      return res.status(responseCodes.badRequest).json({
        error: `No user found with id: ${id}`,
      });
    }
    if (!userExists) {
      return res.status(responseCodes.ServerError).json({
        error: 'Server error',
      });
    }
    return res.status(responseCodes.noContent).send();
  },
};

export default userController;
