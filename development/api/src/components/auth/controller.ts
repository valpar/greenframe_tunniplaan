import { Request, Response } from "express";
import loginService from "./service";
import responseCodes from "../general/responseCodes";
import axios from 'axios';

const authController = {
 
  googleAuth: async (req: Request, res: Response) => { 
    try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];
    if (!token) {
      return res.status(responseCodes.notAuthorized).json({
        error: "No token provided",
      });
    }
  
    const response = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });  
    
    console.log('Google response:', response.data.email);
    res.send('Googli profiil on kätte saadud');
  } catch (error) {
    console.error('External API error:', error);
    res.status(500).send('Error while calling the external API');
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
