import { ActivityType } from "../entities/activityType.entity";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { CreateActivityType } from "../types/activityType/CreateActivityType";
import * as ActivityTypeService from "../services/activityType.service";

@Resolver(ActivityType)
export class ActivityTypeResolver {
  @Query(() => [ActivityType])
  async getActivityTypes(): Promise<ActivityType[]> {
    return ActivityTypeService.findAll();
  }

  @Mutation(() => ActivityType)
  createActivityType(@Arg("activityType") activityType: CreateActivityType): Promise<ActivityType> {
    return ActivityTypeService.create({ ...activityType});
  }
}
