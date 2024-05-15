import { Friend } from "../entities/friend.entity";

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
