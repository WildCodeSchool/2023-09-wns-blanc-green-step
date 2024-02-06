import { ActivityType } from '../entities/activity_type.entity';


export const findAll = (): Promise<ActivityType[]> => {
  return ActivityType.find();
};