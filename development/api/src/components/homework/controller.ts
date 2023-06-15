/* eslint-disable camelcase */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { Request, Response } from 'express';
import responseCodes from '../general/responseCodes';
import homeworkService from './service';
import formatDate from '../../utils/formatDate';

const homeworkController = {
  getAllHomeworks: async (req: Request, res: Response) => {
    const homeworks = await homeworkService.getAllhomeworks();
    if (!homeworks) {
      return res.status(responseCodes.ServerError).json({
        error: 'Server error',
      });
    }
    return res.status(responseCodes.ok).json({
      homeworks,
    });
  },

  getHomeworkById: async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: 'No valid id or subjectCode provided',
      });
    }

    const homework = await homeworkService.gethomeworkId(id);

    if (homework === undefined) {
      return res.status(responseCodes.badRequest).json({
        error: `No homework found with id: ${id}`,
      });
    }
    if (!homework) {
      return res.status(responseCodes.ServerError).json({
        error: 'Server error',
      });
    }
    return res.status(responseCodes.ok).json({
      homework,
    });
  },

  getHomeworkByCode: async (req: Request, res: Response) => {
    const subjectCode: string = req.params.code;
    let { actualDate } = req.params;
    if (actualDate === undefined) {
      actualDate = '3000-12-12'; // tähtaeg kuni selle kuupäevani juhul kui kuupäeva pole
    } else {
      actualDate = formatDate.forSql(actualDate);
    }

    if (!subjectCode) {
      return res.status(responseCodes.badRequest).json({
        error: 'No subjectCode provided',
      });
    }

    const homework = await homeworkService.gethomeworkBySubjectCode(
      subjectCode,
      actualDate,
    );

    if (homework === undefined) {
      return res.status(responseCodes.ok).json({
        // error: `No homework found with id: ${subjectCode}`,
      });
    }
    if (!homework) {
      return res.status(responseCodes.ServerError).json({
        error: 'Server error',
      });
    }
    return res.status(responseCodes.ok).json({
      homework,
    });
  },

  addHomework: async (req: Request, res: Response) => {
    const {
      description, subjectCode, extrasLink,
    } = req.body;
    let { dueDate, subjects_id } = req.body;
    // console.log(description, dueDate, subjectCode, subjects_id, extrasLink);
    if (!description) {
      return res.status(responseCodes.badRequest).json({
        error: 'homework description is missing',
      });
    }

    if (!dueDate) {
      return res.status(responseCodes.badRequest).json({
        error: 'homework dueDate is missing',
      });
    }
    dueDate = formatDate.forSqlDateTime(dueDate);

    if (!subjectCode && !subjects_id) {
      return res.status(responseCodes.badRequest).json({
        error: 'homework subjectCode or subjects_id is missing',
      });
    }
    if (!subjects_id) {
      const subjectId = await homeworkService.getSubjectByCode(subjectCode);

      subjects_id = subjectId.id;
    }

    const id = await homeworkService.createhomework(
      description,
      dueDate,
      subjects_id,
      extrasLink,
    );
    if (!id) {
      return res.status(responseCodes.ServerError).json({
        error: 'Server error',
      });
    }
    return res.status(responseCodes.created).json({
      id,
    });
  },

  deleteHomework: async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: 'No valid id provided',
      });
    }
    const subjectExists = await homeworkService.deletehomework(id);
    if (subjectExists === undefined) {
      return res.status(responseCodes.badRequest).json({
        message: `homework not found with id: ${id}`,
      });
    }
    if (!subjectExists) {
      return res.status(responseCodes.ServerError).json({
        error: 'Server error',
      });
    }
    return res.status(responseCodes.noContent).send();
  },
  updateHomeworkById: async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    const {
      description, subjectCode, extrasLink,
    } = req.body;
    let { dueDate, subjects_id } = req.body;
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: 'No valid id provided',
      });
    }
    if (!dueDate) {
      return res.status(responseCodes.badRequest).json({
        error: 'homework dueDate is missing',
      });
    }
    dueDate = formatDate.forSqlDateTime(dueDate);

    if (!description && !dueDate && !subjects_id && !subjectCode) {
      return res.status(responseCodes.badRequest).json({
        error: 'Nothing to update',
      });
    }
    if (!subjects_id) {
      const subjectId = await homeworkService.getSubjectByCode(subjectCode);
      subjects_id = subjectId.id;
    }

    const homeworkExists = await homeworkService.updatehomework(
      id,
      description,
      dueDate,
      subjects_id,
      extrasLink,
    );

    if (homeworkExists === undefined) {
      return res.status(responseCodes.badRequest).json({
        error: `No homework found with id: ${id}`,
      });
    }
    if (!homeworkExists) {
      return res.status(responseCodes.ServerError).json({
        error: 'Server error',
      });
    }
    return res.status(responseCodes.noContent).send();
  },
};

export default homeworkController;
