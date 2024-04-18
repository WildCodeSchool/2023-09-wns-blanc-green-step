import { User } from "../entities/user.entity";
import * as argon2 from "argon2";

export const findAll = (): Promise<User[]> => {
  return User.find();
};

/**
 * create a new user and hash his password
 * @param username user username
 * @param email user email
 * @param password user password unhashed
 * @return the created user
 */

export async function create(
  username: string,
  email: string,
  password: string
): Promise<User> {
  const newUser = new User();
  newUser.username = username;
  newUser.email = email;
  newUser.password = await argon2.hash(password);

  return newUser.save();
}

/**
 * Return the user relative to the given username
 * @param username user username
 * @return the relatid user
 * @throws error if the user does not exist
 */

export function getByUsername(username: string): Promise<User> {
  return User.findOneByOrFail({
    username: username,
  });
}

/**
 * Return the user relative to the given email
 * @param email user email
 * @return the relatid user
 * @throws error if the user does not exist
 */

export function getByEmail(email: string): Promise<User> {
  return User.findOneByOrFail({
    email: email,
  });
}

export function getById(id: number): Promise<User> {
  return User.findOneByOrFail({
    id: id,
  });
}

export async function update(id: number, email: string, username: string): Promise<User | undefined> {
  const userToUpdate = await User.findOneBy({ id });
  
  if (!userToUpdate) {
    throw new Error("Ad not found");
  }
  
  if (userToUpdate) {
    userToUpdate.email = email;
    userToUpdate.username = username;

    return userToUpdate.save();
  }
}

export async function updatePassword(id: number, password: string): Promise<User | undefined> {
  const userToUpdate = await User.findOneBy({ id });

  if (!userToUpdate) {
    throw new Error("Ad not found");
  }
  
  if (userToUpdate) {
    userToUpdate.password = await argon2.hash(password)

    return userToUpdate.save();
  }
}