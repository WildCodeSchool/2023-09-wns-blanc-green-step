import { Arg, Query, Resolver, Mutation } from "type-graphql";
import { UserChallenge } from "../entities/userChallenge.entity";
import * as UserChallengeService from "../services/userChallenge.service";

@Resolver(UserChallenge)
export class UserChallengeResolver {
  @Query(() => [UserChallenge])
  async getUserChallenges(): Promise<UserChallenge[]> {
    return UserChallengeService.findAll();
  }

  @Query(() => [UserChallenge])
  async getUserChallengesById(@Arg("id") id: number): Promise<UserChallenge[]> {
    return UserChallengeService.getById(id);
  }

  @Mutation(() => UserChallenge)
  async createUserChallenge(
    @Arg("userId") userId: number,
    @Arg("challengeId") challengeId: number
  ): Promise<UserChallenge> {
    return UserChallengeService.createUserChallenge(userId, challengeId);
  }

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
