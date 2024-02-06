import { Query, Resolver } from "type-graphql";
import { UserChallenge } from "../entities/user_challenge.entity";
import * as UserChallengeService from "../services/user_challenge.service";

@Resolver(UserChallenge)
export class UserChallengeResolver {
  @Query(() => [UserChallenge])
  async getUserChallenges(): Promise<UserChallenge[]> {
    return UserChallengeService.findAll();
  }
}