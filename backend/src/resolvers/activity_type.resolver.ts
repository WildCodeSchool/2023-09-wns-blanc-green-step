import { ActivityType } from '../entities/activity_type.entity';
import { Query, Resolver } from "type-graphql";
import * as ActivityTypeService from "../services/activity_type.service";

@Resolver(ActivityType)
export class ActivityTypeResolver {
  @Query(() => [ActivityType])
  async getActivityTypes(): Promise<ActivityType[]> {
    return ActivityTypeService.findAll();
  }
}
