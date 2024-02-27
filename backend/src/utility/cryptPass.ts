import * as bcrypt from 'bcrypt';

const saltRounds = 8;

export const getHash: (pass: string) => Promise<string> = async (
  pass: string,
) => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(pass, salt);
  return hashedPassword;
};

export const compareHash: (
  pass: string,
  hash: string,
) => Promise<boolean> = async (pass: string, hash: string) => {
  const result = await bcrypt.compare(pass, hash);
  return result;
};
