import { Field, InputType } from "type-graphql";

@InputType()
export class UpdateCarbonExpenseType {
    @Field()
    id: number;

    @Field()
    title: string;

    @Field()
    date: Date;

    @Field()
    emission: number;

    @Field()
    activityType: number;
}