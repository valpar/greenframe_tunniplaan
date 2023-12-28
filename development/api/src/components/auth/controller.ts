import { Request, Response } from 'express';
import axios from 'axios';
import loginService from './service';
import responseCodes from '../general/responseCodes';
import jwtService from '../general/services/jwtService';

const authController = {
  googleAuth: async (req: Request, res: Response) => {

    let email = '';
    let user;
    try {
      const authHeader = req.headers.authorization;
      const googleToken = authHeader?.split(' ')[1];
      if (!googleToken) {
        return res.status(responseCodes.notAuthorized).json({
          error: 'No googleToken provided',
        });
      }

      const response = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
        headers: {
          Authorization: `Bearer ${googleToken}`,
        },
      });

      email = response.data.email;

    } catch (error) {
      return res.status(500).send('Google authentication error');
    }

    try {
      const response = await axios.get(`http://${process.env.USERAPI_HOST}:${process.env.USERAPI_PORT}/users/email/${email}`, {
        headers: {
          // eslint-disable-next-line quote-props
          'Authorization': `Bearer ${process.env.USERAPI_TOKEN}`,
          'Content-Type': 'application/json',
        },
      });
      user = {
        id: response.data.data.id,
        firstName: response.data.data.firstName,
        lastName: response.data.data.lastName,
        email: response.data.data.email,
        roles: response.data.data.roles,
      };
    } catch (error) {
      return res.status(500).send('UserApi authentication error');
    }

    const loginProfile = await loginService.googleLogin(user);

    return res.status(responseCodes.ok).json(
      loginProfile,
    );
  },
};

export default authController;
