import { ActivityType } from "../entities/activityType.entity";

export const findAll = (): Promise<ActivityType[]> => {
  return ActivityType.find();
};
