import { Field, InputType } from "type-graphql";

@InputType()
export class CreateCarbonExpenseType {
    @Field()
    title: string;

    @Field()
    date: Date;

    @Field()
    emission: number;

    @Field()
    activityType: number;
}