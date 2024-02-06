import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { User } from "./user.entity";
import { ActivityType } from "./activity_type.entity"


@ObjectType()
@Entity()
export class CarbonExpense extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  date?: Date;

  @Field()
  @Column()
  emission: number;

  @Field()
  @Column()
  carbon_saving: number;

  // @Field()
  // @Column()
  // user: User;

  // @Field()
  // @Column()
  // activityType: ActivityType;
}
