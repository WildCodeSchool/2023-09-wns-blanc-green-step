import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm";
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
  @Column({ default: true })
  is_validated: boolean;

  @Field()
  @ManyToOne(() => User)
  user: User;

  @Field()
  @ManyToOne(() => Challenge)
  challenge: Challenge;
}
