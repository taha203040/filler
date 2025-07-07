import bcrypt from "bcrypt";

/**
 * @params password
 * @returns hashed
 *
 * / */
export const hashPassword = async (password: string) => {
  const salt = 13;
  const hashedpasword = await bcrypt.hash(password, salt);
  return hashedpasword;
};
export const comparPassword = async (password: string, plainedPass: string) => {
  return bcrypt.compare(password, plainedPass);
};
