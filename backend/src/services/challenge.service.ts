import { Challenge } from "../entities/challenge.entity";

export const findAll = (): Promise<Challenge[]> => {
  return Challenge.find({
    relations: {
      activityType: true,
    },
  });
};

export const findById = (id: number): Promise<Challenge> => {
  return Challenge.findOneByOrFail({ id: id });
};
