import { UserChallenge } from "../entities/user_challenge.entity";

export const findAll = (): Promise<UserChallenge[]> => {
  return UserChallenge.find();
};
