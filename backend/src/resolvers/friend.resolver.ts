import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { Friend } from "../entities/friend.entity";
import * as FriendService from "../services/friend.service";

@Resolver(Friend)
export class FriendResolver {
  /**
   *
   * @returns all rows from Friend Entity
   */
  @Authorized()
  @Query(() => [Friend])
  async getFriends(): Promise<Friend[]> {
    return FriendService.findAll();
  }

  /**
   *
   * @param id id from a user
   * @returns all rows from Friend Entity where user_one or user_two matches with id param
   */
  @Authorized()
  @Query(() => [Friend])
  async getFriendsByUserId(@Arg("id") id: number): Promise<Friend[]> {
    return FriendService.findByUser(id);
  }

  /**
   *
   * @param user_id id from user sending the request
   * @param friend_id id from user who will received the request
   * @returns a created friend request
   */
  @Authorized()
  @Mutation(() => Friend)
  async addFriend(
    @Arg("user_id") user_id: number,
    @Arg("friend_id") friend_id: number
  ): Promise<Friend> {
    return FriendService.createFriend(user_id, friend_id);
  }

  /**
   *
   * @param id friend request id
   * @returns a saved accepted friend request
   */
  @Authorized()
  @Mutation(() => Friend)
  async acceptFriend(@Arg("id") id: number): Promise<Friend | undefined> {
    return FriendService.updateFriend(id);
  }

  /**
   *
   * @param id friend request id
   * @returns "OK"
   */
  @Authorized()
  @Mutation(() => String)
  async deleteFriendRequest(@Arg("id") id: number): Promise<string> {
    const deletedFriend = await FriendService.deleteFriend(id);

    return "OK";
  }
}
