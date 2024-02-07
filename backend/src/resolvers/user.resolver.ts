import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entities/user.entity";
import * as UserService from "../services/user.service";

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  async getUsers(): Promise<User[]> {
    return UserService.findAll();
  }
  @Mutation(() => User) 
    register(@Arg("username") username: string, @Arg("email") email: string, @Arg("password") password: string): Promise<User> {
      console.log("register", username, email, password)
        return UserService.create(username, email, password)
  }
}
