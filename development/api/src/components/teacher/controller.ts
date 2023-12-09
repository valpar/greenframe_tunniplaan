import { Request, Response } from 'express';
import responseCodes from '../general/responseCodes';
import { INewTeacher } from './interfaces';
import teacherService from './service';

const teacherController = {
  getAllTeachersById: async (req: Request, res: Response) => {
    const teachers = await teacherService.getAllTeachers();
    // console.log(teachers);
    if (teachers) {
      return res.status(responseCodes.ok).json({ teachers });
    }
    return res.status(responseCodes.ServerError).json({
      error: 'Server error',
    });
  },
  getTeachersSubjects: async (req: Request, res: Response) => {
    const teachersActiveSubjects = await teacherService.getTeachersSubjects();
    if (teachersActiveSubjects) {
      return res.status(responseCodes.ok).json({
        teachersActiveSubjects,
      });
    }
    return res.status(responseCodes.ServerError).json({
      error: 'Server error',
    });
  },
  getTeacherById: async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    const teacher = await teacherService.getTeacherById(id);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: 'No valid id provided',
      });
    }
    if (teacher === undefined) {
      return res.status(responseCodes.badRequest).json({
        error: `No teacher found with id: ${id}`,
      });
    }
    if (!teacher) {
      return res.status(responseCodes.ServerError).json({
        error: 'Server error',
      });
    }
    return res.status(responseCodes.ok).json({
      teacher,
    });
  },

  // Õppejõu kustutamine ainult siis kui tal antavaid ained pole.

  deleteTeacherWhenNoSubjectsById: async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: 'No valid id provided',
      });
    }
    const subjectExists = await teacherService.deleteTeacherById(id);
    if (subjectExists === undefined) {
      return res.status(responseCodes.badRequest).json({
        message: `Teacher not found with id: ${id}`,
      });
    }
    if (subjectExists) {
      return res.status(responseCodes.noContent).send();
    }
    return res.status(responseCodes.ServerError).json({
      error: 'Server error',
    });
  },

  // Uue Õppejõu lisamine

  addTeacher: async (req: Request, res: Response) => {
    const { firstName, lastName, email } = req.body;
    // console.log(firstName, lastName, email);
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
    if (!email) {
      return res.status(responseCodes.badRequest).json({
        error: 'Email is required',
      });
    }
    const newTeacher: INewTeacher = {
      firstName,
      lastName,
      email,
    };
    const id = await teacherService.createTeacher(newTeacher);
    if (id) {
      return res.status(responseCodes.created).json({
        id,
      });
    }
    return res.status(responseCodes.ServerError).json({
      error: 'Server error',
    });
  },
  updateTeacherById: async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    const { firstName, lastName, email } = req.body;
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: 'No valid id provided',
      });
    }
    if (!firstName) {
      return res.status(responseCodes.badRequest).json({
        error: 'Provide firstname',
      });
    }
    if (!lastName) {
      return res.status(responseCodes.badRequest).json({
        error: 'Provide lastname',
      });
    }
    if (!email) {
      return res.status(responseCodes.badRequest).json({
        error: 'Email is required',
      });
    }
    const newTeacher: INewTeacher = {
      firstName,
      lastName,
      email,
    };
    const teacherExists = await teacherService.updateTeacherById(
      newTeacher,
      id,
    );
    if (teacherExists === undefined) {
      return res.status(responseCodes.badRequest).json({
        error: `No user found with id: ${id}`,
      });
    }
    if (teacherExists) {
      return res.status(responseCodes.noContent).send();
    }
    return res.status(responseCodes.ServerError).json({
      error: 'Server error',
    });
  },
};

export default teacherController;
