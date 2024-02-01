import { Query, Resolver } from "type-graphql";
import { User } from "../entities/user.entity";
import * as UserService from "../services/user.service";

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  async getUsers(): Promise<User[]> {
    return UserService.findAll();
  }
}
