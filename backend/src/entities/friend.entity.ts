import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entity";

@ObjectType()
@Entity()
export class Friend extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ default: false })
  is_accepted: boolean;

  @Field(() => User)
  @ManyToOne(() => User)
  user_one: User;

  @Field(() => User)
  @ManyToOne(() => User)
  user_two: User;
}
