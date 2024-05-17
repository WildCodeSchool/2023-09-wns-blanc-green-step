import { ActivityType } from "../entities/activityType.entity";

export const findAll = (): Promise<ActivityType[]> => {
  return ActivityType.find();
};

export async function create(activityTypeData: {
  name: string,
  icon: string,
  carbon_emission: number

}): Promise<ActivityType> {
  const activityType = new ActivityType();

  activityType.name = activityTypeData.name;
  activityType.icon = activityTypeData.icon;
  activityType.carbon_emission = activityTypeData.carbon_emission;

  return await activityType.save();
}
