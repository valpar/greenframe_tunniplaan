import bcrypt from 'bcrypt';

const saltRounds = 10;
const hashService = {
  hash: async (password: string): Promise<string> => {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  },
  match: async (password: string, hash: string): Promise<boolean> => {
    const match = await bcrypt.compare(password, hash);
    return match;
  },
};
export default hashService;
