import { Query, Resolver } from "type-graphql";
import { Challenge } from "../entities/challenge.entity";
import * as ChallengeService from "../services/challenge.service";

@Resolver(Challenge)
export class ChallengeResolver {
  @Query(() => [Challenge])
  async getChallenges(): Promise<Challenge[]> {
    return ChallengeService.findAll();
  }
}
