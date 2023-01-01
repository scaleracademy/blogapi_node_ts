import { hash, compare } from "bcryptjs";

const SALT_ROUNDS = 10; // TODO: move to config

export const bcryptService = {
  hash: async (password: string): Promise<string> => {
    return hash(password, SALT_ROUNDS);
  },
  verify: async (password: string, hash: string): Promise<boolean> => {
    return compare(password, hash);
  }
};
