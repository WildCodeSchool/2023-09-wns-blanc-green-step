import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { CarbonExpense } from "./carbonExpense.entity";
import { MaxLength } from "class-validator";

@ObjectType()
@Entity()
export class ActivityType extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  @MaxLength(20)
  name: string;

  @Field(() => String)
  @Column()
  icon: string;

  @Field(() => Number)
  @Column()
  carbon_emission: number;

  @OneToMany(() => CarbonExpense, carbonExpense => carbonExpense.activityType)
  carbonExpense: CarbonExpense[];
}
