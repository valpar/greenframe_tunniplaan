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

  // Järgnevad kaks rida välja kommenteeritud ja ümber kirjutatud
  // scheduled ? (testScheduled = validateField.testFields(scheduled)) : true;
  // subject ? (testSubject = validateField.testFields(subject)) : true;

  testScheduled = validateField.testFields(scheduled);
  testSubject = validateField.testFields(subject);

  if (testScheduled && testSubject) {
    console.log("Kõik on korras");
    return next();
  }

  console.log("Siia ongi see koer maetud");

  return res.status(responseCodes.badRequest).json({
    error: 'Insert only letters, numbers or -.,!',
  });
};

export default checkAlphabetAndNumber;
