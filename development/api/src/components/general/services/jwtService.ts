import jwt from 'jsonwebtoken';
import { IUser } from '../../users/interfaces.ts';

const jwtPassword = 'jagj9032jfKJKJgka903dsksfjsöd';

const jwtService = {
  sign: (user: IUser) => {
    const payload = {
      id: user.id,
      role: user.role,
    };
    const token = jwt.sign(payload, jwtPassword, { expiresIn: '1h' });
    return token;
  },
  verify: (token: string) => {
    try {
      const verify = jwt.verify(token, jwtPassword);
      return verify;
    } catch {
      return false;
    }
  },
};

export default jwtService;
