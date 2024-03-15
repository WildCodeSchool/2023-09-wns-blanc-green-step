import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { User } from "./user.entity";
import { ActivityType } from "./activityType.entity";

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

  @ManyToOne(() => User)
  user: User;

  @Field(() => ActivityType)
  @ManyToOne(() => ActivityType, activityType => activityType.carbonExpense)
  activityType: ActivityType;
}
