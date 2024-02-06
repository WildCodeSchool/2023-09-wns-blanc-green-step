import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { User } from "./user.entity";
import { Challenge } from "./challenge.entity";

@ObjectType()
@Entity()
export class UserChallenge extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  is_validated: boolean;

  // @Field()
  // @Column()
  // user: User;

  // @Field()
  // @Column()
  // challenge: Challenge ;
}
