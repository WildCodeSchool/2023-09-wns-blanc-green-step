import { Friend } from "../entities/friend.entity";
import * as UserService from "./user.service";

/**
 *
 * @returns an Array of all Friends from Entity
 */
export const findAll = (): Promise<Friend[]> => {
  return Friend.find({
    relations: {
      user_one: true,
      user_two: true,
    },
  });
};

/**
 *
 * @param userId id from a user
 * @returns all entries where user_one or user_two has the same id as user from userId
 */
export const findByUser = (userId: number): Promise<Friend[]> => {
  return Friend.find({
    relations: {
      user_one: true,
      user_two: true,
    },
    where: [
      {
        user_one: { id: userId },
      },
      {
        user_two: { id: userId },
      },
    ],
  });
};

/**
 *
 * @param id request friend id
 * @returns a friend request
 */
export const findById = (id: number): Promise<Friend | null> => {
  return Friend.findOneBy({ id });
};

/**
 *
 * @param user_id id from user sending the request
 * @param friend_id id from user who will receive the request
 * @returns friend request after saving it
 */
export const createFriend = async (
  user_id: number,
  friend_id: number
): Promise<Friend> => {
  // We get both user and friend from DB
  const userFromDB = await UserService.getById(user_id);
  const friendFromDB = await UserService.getById(friend_id);

  const friend = new Friend();
  friend.user_one = userFromDB;
  friend.user_two = friendFromDB;

  return await friend.save();
};

/**
 *
 * @param id friend request id
 * @returns a saved accepted friend request
 */
export const updateFriend = async (id: number): Promise<Friend | undefined> => {
  const userFromdDB = await findById(id);

  if (userFromdDB) {
    userFromdDB.is_accepted = true;

    return userFromdDB.save();
  }
};
