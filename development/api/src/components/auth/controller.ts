/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { Request, Response } from 'express';
import axios from 'axios';
import loginService from './service';
import responseCodes from '../general/responseCodes';
import userApi from '../../token';

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
      // console.log('Google response:', response.data.email);
    } catch (error) {
    // console.error('External API error:', error);
      return res.status(500).send('Google autenth error');
    }

    try{
      const response = await axios.get(`${userApi.url}/users/email/${'mrt@tlu.ee'}`, {
        headers: {
          'Authorization': `Bearer ${userApi.token}`,
          'Content-Type': 'application/json'
        }
      });
      
      user = {
        id: response.data.data.id,
        firstName: response.data.data.firstName,
        lastName: response.data.data.lastName,
        email: response.data.data.email,
        roles: response.data.data.roles
      };
    }
    catch (error) {
      return res.status(500).send('UserApi autenth error');
    }
    
    const loginProfile = await loginService.googleLogin(user);
      return res.status(responseCodes.ok).json(
        loginProfile,
      );


  },
};

export default authController;
