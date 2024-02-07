import { Field, InputType } from "type-graphql";

@InputType()
export class CreateUserInputType {
  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  password: string;

  
}