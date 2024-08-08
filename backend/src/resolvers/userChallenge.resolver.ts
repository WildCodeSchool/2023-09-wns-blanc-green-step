import { Arg, Query, Resolver, Mutation, Authorized } from "type-graphql";

import { UserChallenge } from "../entities/userChallenge.entity";
import * as UserChallengeService from "../services/userChallenge.service";

@Resolver(UserChallenge)
export class UserChallengeResolver {
  @Authorized()
  @Query(() => [UserChallenge])
  async getUserChallenges(): Promise<UserChallenge[]> {
    return UserChallengeService.findAll();
  }

  @Authorized()
  @Query(() => [UserChallenge])
  async getUserChallengesById(@Arg("id") id: number): Promise<UserChallenge[]> {
    return UserChallengeService.getById(id);
  }

  @Authorized()
  @Mutation(() => UserChallenge)
  async createUserChallenge(
    @Arg("userId") userId: number,
    @Arg("challengeId") challengeId: number
  ): Promise<UserChallenge> {
    return UserChallengeService.createUserChallenge(userId, challengeId);
  }

  @Authorized()
  @Mutation(() => String)
  async deleteUserChallenge(
    @Arg("userId") userId: number,
    @Arg("challengeId") challengeId: number
  ): Promise<string> {
    const deleteUserChallenge = await UserChallengeService.deleteUserChallenge(
      userId,
      challengeId
    );
    return "OK";
  }
}
