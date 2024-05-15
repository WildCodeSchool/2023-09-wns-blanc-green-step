import { Arg, Query, Resolver } from "type-graphql";
import { Friend } from "../entities/friend.entity";
import * as FriendService from "../services/friend.service";

@Resolver(Friend)
export class FriendResolver {
  /**
   *
   * @returns all rows from Friend Entity
   */
  @Query(() => [Friend])
  async getFriends(): Promise<Friend[]> {
    return FriendService.findAll();
  }

  /**
   *
   * @param id id from a user
   * @returns all rows from Friend Entity where user_one or user_two matches with id param
   */
  @Query(() => [Friend])
  async getFriendsByUserId(@Arg("id") id: number): Promise<Friend[]> {
    return FriendService.findByUser(id);
  }
}
