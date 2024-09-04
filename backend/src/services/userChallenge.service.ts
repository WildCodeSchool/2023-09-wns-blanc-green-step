import { UserChallenge } from "../entities/userChallenge.entity";
import * as UserService from "../services/user.service";
import * as ChallengeService from "../services/challenge.service";
import { DeleteResult } from "typeorm";

export const findAll = (): Promise<UserChallenge[]> => {
  return UserChallenge.find({
    relations: {
      user: true,
      challenge: true,
    },
  });
};

export async function getById(id: number): Promise<UserChallenge[]> {
  const result: UserChallenge[] = await UserChallenge.find({
    relations: {
      user: true,
      challenge: true,
    },
    where: {
      user: {
        id: id,
      },
    },
  });

  return result;
}

/**
 * create a new user challenge
 * @param userId user id
 * @param userChallenge user id
 * @return the created userchallenge
 */

export async function createUserChallenge(
  userId: number,
  challengeId: number
): Promise<UserChallenge> {
  const userFromDB = await UserService.getById(userId);
  const challengeFromDB = await ChallengeService.findById(challengeId);

  const userchallenge = new UserChallenge();
  userchallenge.user = userFromDB;
  if (challengeFromDB) {
    userchallenge.challenge = challengeFromDB;
  }

  return await userchallenge.save();
}

/**
 *
 * @param id user challenge request id
 * @returns delete a user challenge request
 */
export const deleteUserChallenge = async (
  userId: number,
  challengeId: number
): Promise<DeleteResult | string> => {
  const userFromDB = await UserService.getById(userId);
  const challengeFromDB = await ChallengeService.findById(challengeId);

  const userChallenge = await UserChallenge.findOne({
    relations: {
      user: true,
      challenge: true,
    },
    where: {
      user: userFromDB,
    },
  });

  if (!userChallenge) {
    return "not found";
  }

  return await UserChallenge.delete({ id: userChallenge.id });
};
