//import bcrypt from 'bcrypt';
import bcryptjs from 'bcryptjs'

const saltRounds = 10;
const hashService = {
  hash: async (password: string): Promise<string> => {
    const hash = await bcryptjs.hash(password, saltRounds);
    return hash;
  },
  match: async (password: string, hash: string): Promise<boolean> => {
    const match = await bcryptjs.compare(password, hash);
    return match;
  },
};
export default hashService;
