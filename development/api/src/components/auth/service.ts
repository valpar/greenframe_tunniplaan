/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import userService from '../users/service';
import hashService from '../general/services/hashService';
import jwtService from '../general/services/jwtService';

const loginService = {
  login: async (email: string, password: string) => {
    const user: any = await userService.getUserByEmail(email);
    if (user === undefined) return undefined;
    if (!user) return false;
    //const match = await hashService.match(password, user.password);
    //if (!match) return '0';
    console.log(user);
    const token = await jwtService.sign(user);
    return token;
  },
  googleLogin: async (email: string) => {
    const user: any = await userService.getUserByEmail(email);
    if (user === undefined) return undefined;
    if (!user) return false;
    const token = await jwtService.sign(user);
    return { token, user };
  },
};

export default loginService;
