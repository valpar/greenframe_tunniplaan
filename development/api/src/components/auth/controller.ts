import { Request, Response } from "express";
import loginService from "./service";
import responseCodes from "../general/responseCodes";
import axios from 'axios';

const authController = {
 
  googleAuth: async (req: Request, res: Response) => { 
    try {
    const authHeader = req.headers.authorization;
    const googleToken = authHeader?.split(" ")[1];
    if (!googleToken) {
      return res.status(responseCodes.notAuthorized).json({
        error: "No googleToken provided",
      });
    }
  
    const response = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
      headers: {
        Authorization: `Bearer ${googleToken}`,
      },
    });  
    
    console.log('Google response:', response.data.email);
    const loginProfile = await loginService.googleLogin(response.data.email);
    return res.status(responseCodes.ok).json(
      loginProfile, 
    );

  } catch (error) {
    // console.error('External API error:', error);
    res.status(500).send('Google autenth error');
  }}
,
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const token = await loginService.login(email, password);
    if (token === undefined) {
      return res.status(responseCodes.notAuthorized).json({
        error: "Check credentials",
      });
    }
    if (!token) {
      return res.status(responseCodes.ServerError).json({
        error: "Server error",
      });
    }
    if (token === "0") {
      return res.status(responseCodes.notAuthorized).json({
        error: "Check password",
      });
    }
    return res.status(responseCodes.ok).json({
      token,
    });
  },
};

export default authController;
