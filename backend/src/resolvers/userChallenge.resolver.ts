import { Arg, Query, Resolver } from "type-graphql";
import { UserChallenges } from "../entities/userChallenge.entity";
import * as UserChallengeService from "../services/userChallenge.service";

@Resolver(UserChallenges)
export class UserChallengeResolver {
  @Query(() => [UserChallenges])
  async getUserChallenges(): Promise<UserChallenges[]> {
    return UserChallengeService.findAll();
  }

  @Query(() => UserChallenges)
  async getUserChallengesById(
    @Arg("id") id: number
  ): Promise<UserChallenges | null> {
    return UserChallengeService.getById(id);
  }
}
