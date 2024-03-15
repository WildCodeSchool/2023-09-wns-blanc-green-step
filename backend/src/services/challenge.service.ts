import { Challenge } from "../entities/challenge.entity";

export const findAll = (): Promise<Challenge[]> => {
  return Challenge.find();
};

export const findById = (id: number): Promise<Challenge | null> => {
  return Challenge.findOneBy({ id: id });
};
