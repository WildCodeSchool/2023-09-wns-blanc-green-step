import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entities/user.entity";
import * as UserService from "../services/user.service";
import * as AuthService from "../services/auth.service";

@Resolver(User)
export class UserResolver {
  @Authorized()
  @Query(() => [User])
  async getUsers(): Promise<User[]> {
    return UserService.findAll();
  }

  @Query(() => User)
  async getUserById(@Arg("id") id: number): Promise<User> {
    return UserService.getById(id);
  }

  @Mutation(() => User)
  register(
    @Arg("username") username: string,
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<User> {
    return UserService.create(username, email, password);
  }

  @Mutation(() => String)
  login(@Arg("email") email: string, @Arg("password") password: string) {
    return AuthService.login(email, password);
  }

  @Mutation(() => User)
  updateUser(@Arg("id") id: number, @Arg("email") email: string, @Arg("username") username: string, @Arg("image") image: string) {
    return UserService.update(id, email, username, image);
  }

  @Mutation(() => User)
  updateUserPassword(@Arg("id") id: number, @Arg("password") password: string) {
    return UserService.updatePassword(id, password);
  }
}
