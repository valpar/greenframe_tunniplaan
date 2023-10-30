import { Request, Response } from 'express';
import responseCodes from '../general/responseCodes.ts';
import { INewLector } from './interfaces.ts';
import lecturerService from './service.ts';

const lecturerController = {
  getAllLecturersById: async (req: Request, res: Response) => {
    const lecturers = await lecturerService.getAllLecturers();
    // console.log(lecturers);
    if (lecturers) {
      return res.status(responseCodes.ok).json({ lecturers });
    }
    return res.status(responseCodes.ServerError).json({
      error: 'Server error',
    });
  },
  getLecturersSubjects: async (req: Request, res: Response) => {
    const lecturersActiveSubjects = await lecturerService.getLecturersSubjects();
    if (lecturersActiveSubjects) {
      return res.status(responseCodes.ok).json({
        lecturersActiveSubjects,
      });
    }
    return res.status(responseCodes.ServerError).json({
      error: 'Server error',
    });
  },
  getLecturerById: async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    const lecturer = await lecturerService.getLecturerById(id);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: 'No valid id provided',
      });
    }
    if (lecturer === undefined) {
      return res.status(responseCodes.badRequest).json({
        error: `No lecturer found with id: ${id}`,
      });
    }
    if (!lecturer) {
      return res.status(responseCodes.ServerError).json({
        error: 'Server error',
      });
    }
    return res.status(responseCodes.ok).json({
      lecturer,
    });
  },

  // Õppejõu kustutamine ainult siis kui tal antavaid ained pole.

  deleteLecturerWhenNoSubjectsById: async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: 'No valid id provided',
      });
    }
    const subjectExists = await lecturerService.deleteLecturerById(id);
    if (subjectExists === undefined) {
      return res.status(responseCodes.badRequest).json({
        message: `Lecturer not found with id: ${id}`,
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

  addLecturer: async (req: Request, res: Response) => {
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
    const newLecturer: INewLector = {
      firstName,
      lastName,
      email,
    };
    const id = await lecturerService.createlecturer(newLecturer);
    if (id) {
      return res.status(responseCodes.created).json({
        id,
      });
    }
    return res.status(responseCodes.ServerError).json({
      error: 'Server error',
    });
  },
  updateLecturerById: async (req: Request, res: Response) => {
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
    const newLecturer: INewLector = {
      firstName,
      lastName,
      email,
    };
    const lecturerExists = await lecturerService.updateLecturerById(
      newLecturer,
      id,
    );
    if (lecturerExists === undefined) {
      return res.status(responseCodes.badRequest).json({
        error: `No user found with id: ${id}`,
      });
    }
    if (lecturerExists) {
      return res.status(responseCodes.noContent).send();
    }
    return res.status(responseCodes.ServerError).json({
      error: 'Server error',
    });
  },
};

export default lecturerController;
