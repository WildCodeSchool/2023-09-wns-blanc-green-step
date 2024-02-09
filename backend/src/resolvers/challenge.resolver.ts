import { Query, Resolver, Arg } from "type-graphql";
import { Challenge } from "../entities/challenge.entity";
import * as ChallengeService from "../services/challenge.service";

@Resolver(Challenge)
export class ChallengeResolver {
  @Query(() => [Challenge])
  async getChallenges(): Promise<Challenge[]> {
    return ChallengeService.findAll();
  }

  @Query(() => Challenge)
  getChallengeById(@Arg("id") id: number): Promise<Challenge | null> {
    return ChallengeService.findById(id);
  }
}
