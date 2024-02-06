import { Challenge } from "../entities/challenge.entity";

export const findAll = (): Promise<Challenge[]> => {
  return Challenge.find();
};
