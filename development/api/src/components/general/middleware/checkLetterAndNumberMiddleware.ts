import { Request, Response, NextFunction } from 'express';
import responseCodes from '../responseCodes';
import validateField from '../services/service';

const checkAlphabetAndNumber = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { subject, subjectCode, creditPoint } = req.body;

  if (!subject || !subjectCode || !creditPoint) {
    return res.status(responseCodes.badRequest).json({
      error: 'Subject, subject code, or credit point is missing',
    });
  }

  const testSubject = validateField.testFields(subject);
  const testSubjectCode = validateField.testFields(subjectCode);

  if (testSubject && testSubjectCode) {
    return next();
  }
  return res.status(responseCodes.badRequest).json({
    error: 'Insert only letters, numbers or -.,!',
  });
};

export default checkAlphabetAndNumber;
