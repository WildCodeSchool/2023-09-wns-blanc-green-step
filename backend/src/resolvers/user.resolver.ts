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
  @Mutation(() => User) 
    register(@Arg("username") username: string, @Arg("email") email: string, @Arg("password") password: string): Promise<User> {
        return UserService.create(username, email, password)
  }
  @Mutation(() => String)
    login(@Arg("email") email: string, @Arg("password") password: string) {
        return AuthService.login(email, password);
    }
}
