import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { CarbonExpense } from "./carbonExpense.entity";

@ObjectType()
@Entity()
export class ActivityType extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  icon: string;

  @Field()
  @Column()
  carbon_emission: number;

  @OneToMany(() => CarbonExpense, carbonExpense => carbonExpense.activityType)
  carbonExpense: CarbonExpense[];
}
