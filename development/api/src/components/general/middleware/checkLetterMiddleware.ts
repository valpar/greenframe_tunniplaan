import { Request, Response, NextFunction } from 'express';
import responseCodes from '../responseCodes.ts';
import validateField from '../services/service.ts';

const checkAlphabet = (req: Request, res: Response, next: NextFunction) => {
  const { firstName, lastName } = req.body;
  let testFirst = true;
  let testLast = true;
  if (firstName) {
    testFirst = validateField.testName(firstName);
  }
  if (lastName) {
    testLast = validateField.testName(lastName);
  }
  if (testFirst && testLast) {
    return next();
  }
  return res.status(responseCodes.badRequest).json({
    error: 'Insert only letters, space or -',
  });
};

export default checkAlphabet;
