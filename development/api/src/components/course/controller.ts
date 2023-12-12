import { Request, Response } from 'express';
import responseCodes from '../general/responseCodes';
import courseService from './service';

const courseController = {
  getAllCourses: async (req: Request, res: Response) => {
    const courses = await courseService.getAllCourses();
    if (!courses) {
      return res.status(responseCodes.ServerError).json({
        error: 'Server error',
      });
    }
    return res.status(responseCodes.ok).json({
      courses,
    });
  },
  getCourseById: async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    const course = await courseService.getCourseId(id);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: 'No valid id provided',
      });
    }
    if (course === undefined) {
      return res.status(responseCodes.badRequest).json({
        error: `No course found with id: ${id}`,
      });
    }
    if (!course) {
      return res.status(responseCodes.ServerError).json({
        error: 'Server error',
      });
    }
    return res.status(responseCodes.ok).json({
      course,
    });
  },
  addCourse: async (req: Request, res: Response) => {
    const { courseCode, courseName } = req.body;
    if (!courseCode && !courseName) {
      return res.status(responseCodes.badRequest).json({
        error: 'CourseCode or CourseName is missing',
      });
    }
    const id = await courseService.createCourse(courseCode, courseName);
    if (!id) {
      return res.status(responseCodes.ServerError).json({
        error: 'Server error',
      });
    }
    return res.status(responseCodes.created).json({
      id,
    });
  },
  deleteCourse: async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: 'No valid id provided',
      });
    }
    const subjectExists = await courseService.deleteCourse(id);
    if (subjectExists === undefined) {
      return res.status(responseCodes.badRequest).json({
        message: `Course not found with id: ${id}`,
      });
    }
    if (!subjectExists) {
      return res.status(responseCodes.ServerError).json({
        error: 'Server error',
      });
    }
    return res.status(responseCodes.noContent).send();
  },
  updateCourseById: async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    const { courseCode, courseName } = req.body;
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: 'No valid id provided',
      });
    }
    if (!courseCode || !courseName) {
      return res.status(responseCodes.badRequest).json({
        error: 'Nothing to update',
      });
    }
    const courseExists = await courseService.updateCourse(id, courseCode, courseName);
    if (courseExists === undefined) {
      return res.status(responseCodes.badRequest).json({
        error: `No course found with id: ${id}`,
      });
    }
    if (!courseExists) {
      return res.status(responseCodes.ServerError).json({
        error: 'Server error',
      });
    }
    return res.status(responseCodes.noContent).send();
  },
};

export default courseController;
