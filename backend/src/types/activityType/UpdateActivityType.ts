import { Field, InputType } from "type-graphql";

@InputType()
export class UpdateActivityType {
    @Field()
    name: string;

    @Field()
    icon: string;

    @Field()
    carbon_emission: number;
}