import { User } from "../entities/user.entity";

export const findAll = (): Promise<User[]> => {
  return User.find();
};
