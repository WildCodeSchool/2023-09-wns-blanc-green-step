import { UserChallenge } from "../entities/userChallenge.entity";

export const findAll = (): Promise<UserChallenge[]> => {
  return UserChallenge.find();
};
