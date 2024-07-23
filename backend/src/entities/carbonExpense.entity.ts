import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { User } from "./user.entity";
import { ActivityType } from "./activityType.entity";
import { MaxLength } from "class-validator";

@ObjectType()
@Entity()
export class CarbonExpense extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  @MaxLength(20)
  title: string;

  @Field(() => Date)
  @Column()
  date?: Date;

  @Field(() => Number)
  @Column()
  emission: number;

  @ManyToOne(() => User)
  user: User;

  @Field(() => ActivityType)
  @ManyToOne(() => ActivityType, activityType => activityType.carbonExpense)
  activityType: ActivityType;
}
