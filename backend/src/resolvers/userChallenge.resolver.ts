import { Query, Resolver } from "type-graphql";
import { UserChallenge } from "../entities/userChallenge.entity";
import * as UserChallengeService from "../services/userChallenge.service";

@Resolver(UserChallenge)
export class UserChallengeResolver {
  @Query(() => [UserChallenge])
  async getUserChallenges(): Promise<UserChallenge[]> {
    return UserChallengeService.findAll();
  }
}
