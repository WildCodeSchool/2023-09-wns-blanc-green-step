import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { ActivityType } from "../entities/activityType.entity";

@ObjectType()
@Entity()
export class Challenge extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  image: string;

  @Field()
  @Column()
  carbon_saving: number;

  @Field(() => ActivityType)
  @ManyToOne(() => ActivityType, (activityType) => activityType.carbonExpense)
  activityType: ActivityType;
}
