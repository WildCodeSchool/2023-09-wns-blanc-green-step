import { ActivityType } from "../entities/activityType.entity";
import { Query, Resolver } from "type-graphql";
import * as ActivityTypeService from "../services/activityType.service";

@Resolver(ActivityType)
export class ActivityTypeResolver {
  @Query(() => [ActivityType])
  async getActivityTypes(): Promise<ActivityType[]> {
    return ActivityTypeService.findAll();
  }
}
