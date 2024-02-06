import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Field, ObjectType } from "type-graphql";


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
  color: string;

  @Field()
  @Column()
  icon: string;

  @Field()
  @Column()
  carbon_emission: number;

}
