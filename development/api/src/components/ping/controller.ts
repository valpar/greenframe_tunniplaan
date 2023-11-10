import { Request, Response } from 'express';
import responseCodes from '../general/responseCodes';

const ping = (req: Request, res: Response) => {
  res.status(responseCodes.ok).json({
    message: 'Alive',
  });
};

export default ping;
