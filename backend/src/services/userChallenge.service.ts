import { UserChallenges } from "../entities/userChallenge.entity";
import * as UserService from "../services/user.service";
import * as ChallengeService from "../services/challenge.service";
import { DeleteResult } from "typeorm";

export const findAll = (): Promise<UserChallenges[]> => {
  return UserChallenges.find({
    relations: {
      user: true,
      challenge: true,
    },
  });
};

export function getById(id: number): Promise<UserChallenges | null > {
  return UserChallenges.findOne({
    relations: {
      user: true,
      challenge: true,
    },
    where: { id: id },
  });
}

/**
 * create a new user challenge
 * @param userId user id
 * @param userChallenge user id
 * @return the created userchallenge
 */

export async function create(
  userId: number,
  challengeId: number
): Promise<UserChallenges> {
  const userFromDB = await UserService.getById(userId);
  const challengeFromDB = await ChallengeService.findById(challengeId);

  const userchallenge = new UserChallenges();
  userchallenge.user = userFromDB;
  userchallenge.challenge = challengeFromDB;

  return await userchallenge.save();
}

/**
 *
 * @param id user challenge request id
 * @returns delete a user challenge request
 */
export const deleteUserChallenge = async (
  id: number
): Promise<DeleteResult> => {
  return UserChallenges.delete({ id });
};
