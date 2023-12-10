/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
// import userService from '../users/service';
// import hashService from '../general/services/hashService';
import jwtService from '../general/services/jwtService';
// import axios from 'axios';

const loginService = {
  googleLogin: async (user: any) => {
    // const user: any = await userService.getUserByEmail('andrus.kyynarpuu@gmail.com');
    if (user === undefined) return undefined;
    if (!user) return false;
    const token = await jwtService.sign(user);
    return { token, user };
  },
};

export default loginService;
