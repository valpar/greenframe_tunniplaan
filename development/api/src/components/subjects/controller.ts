import { Request, Response } from 'express';
import responseCodes from '../general/responseCodes';
import { INewSubject } from './interfaces';

import subjectServices from './service';

const subjectController = {
  getAllSubjects: async (req: Request, res: Response) => {
    const subjects = await subjectServices.getAllSubjects();
    if (subjects) {
      return res.status(responseCodes.ok).json({ subjects });
    }
    return res.status(responseCodes.ServerError).json({
      error: 'Server error',
    });
  },
  // eslint-disable-next-line consistent-return
  getSubjectById: async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    const { subjectCode } = req.body;
    if (!subjectCode && !id) {
      return res.status(responseCodes.badRequest).json({
        error: 'No valid id or subjectCode provided',
      });
    }

    if (!id) {
      const subject = await subjectServices.getSubjectByCode(subjectCode);
      if (subject === false) {
        return res.status(responseCodes.ServerError).json({
          error: 'Server error',
        });
      }
      if (!subject) {
        return res.status(responseCodes.badRequest).json({
          error: `No subject found with subjectCode: ${subjectCode}`,
        });
      }
      return res.status(responseCodes.ok).json({
        subject,
      });
    }

    if (!subjectCode) {
      const subject = await subjectServices.getSubjectById(id);

      if (subject === false) {
        return res.status(responseCodes.ServerError).json({
          error: 'Server error',
        });
      }
      if (!subject) {
        return res.status(responseCodes.badRequest).json({
          error: `No subject found with id: ${id}`,
        });
      }
      return res.status(responseCodes.ok).json({
        subject,
      });
    }
  },
  addSubject: async (req: Request, res: Response) => {
    const { subject, subjectCode, creditPoint } = req.body;
    // see kontroll liikus middleware-sse, sest muidu 500 error koguaeg
    /* if (!subject) {
      return res.status(responseCodes.badRequest).json({
        error: 'Subject is missing',
      });
    }
    if (!subjectCode) {
      return res.status(responseCodes.badRequest).json({
        error: 'subjectCode is missing',
      });
    }
    if (!creditPoint) {
      return res.status(responseCodes.badRequest).json({
        error: 'creditPoint is missing',
      });
    } */
    const subjectData: INewSubject = {
      subject,
      subjectCode,
      creditPoint,
    };

    const id = await subjectServices.createSubject(subjectData);
    if (id === false) {
      return res.status(responseCodes.badRequest).json({
        error: 'A subject with this subjectCode already exists',
      });
    }
    if (id) {
      return res.status(responseCodes.created).json({
        id,
      });
    }
    return res.status(responseCodes.ServerError).json({
      error: 'Server error',
    });
  },
  deleteSubject: async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: 'No valid id provided',
      });
    }
    const subjectExists = await subjectServices.deleteSubject(id);
    if (subjectExists === false) {
      return res.status(responseCodes.badRequest).json({
        message: `Subject not found with id: ${id}`,
      });
    }
    if (subjectExists === undefined) {
      return res.status(responseCodes.ServerError).json({
        error: 'Server error',
      });
    }
    return res.status(responseCodes.noContent).send();
  },

  updateSubjectById: async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    const { subject, subjectCode, creditPoint } = req.body;
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: 'No valid id provided',
      });
    }
    if (!subject && !subjectCode && !creditPoint) {
      return res.status(responseCodes.badRequest).json({
        error: 'Nothing to update',
      });
    }

    const subjectData: any = {
      id,
      subject,
      subjectCode,
      creditPoint,
    };

    const subjectExists = await subjectServices.updateSubjectById(
      subjectData,
    );
    if (subjectExists === false) {
      return res.status(responseCodes.badRequest).json({
        error: `No subject found with id: ${id}`,
      });
    }
    if (subjectExists === undefined) {
      return res.status(responseCodes.ServerError).json({
        error: 'Server error',
      });
    }

    return res.status(responseCodes.noContent).send();
  },

};

export default subjectController;
