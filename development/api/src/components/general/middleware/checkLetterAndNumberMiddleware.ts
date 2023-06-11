/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { Request, Response, NextFunction } from 'express';
import responseCodes from '../responseCodes';
import validateField from '../services/service';

const checkAlphabetAndNumber = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { scheduled, subject } = req.body;
  let testScheduled = true;
  let testSubject = true;

  scheduled ? (testScheduled = validateField.testFields(scheduled)) : true;
  subject ? (testSubject = validateField.testFields(subject)) : true;

  if (testScheduled && testSubject) {
    return next();
  }
  return res.status(responseCodes.badRequest).json({
    error: 'Insert only letters, numbers or -.,!',
  });
};

export default checkAlphabetAndNumber;
