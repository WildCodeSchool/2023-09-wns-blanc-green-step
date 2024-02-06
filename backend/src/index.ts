import "reflect-metadata";
import { dataSource } from "./config/db";
import { ApolloServer } from "apollo-server";
import * as dotenv from "dotenv";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/user.resolver";
import { UserChallengeResolver } from "./resolvers/user_challenge.resolver";
import { ChallengeResolver } from "./resolvers/challenge.resolver";
import { CarbonExpenseResolver } from "./resolvers/carbon_expense.resolver";
import { ActivityTypeResolver } from "./resolvers/activity_type.resolver";

const start = async () => {
  dotenv.config();
  const port: number = parseInt(process.env.PORT as string);
  await dataSource.initialize();

  const schema = await buildSchema({
    resolvers: [UserResolver, UserChallengeResolver, ChallengeResolver, CarbonExpenseResolver, ActivityTypeResolver ],
    validate: { forbidUnknownValues: false },
  });

  const server = new ApolloServer({ schema });

  try {
    const { url } = await server.listen({ port });
    console.log(`Server is running on ${url} !`);
  } catch (err) {
    console.error("Error while starting the Server!");
  }
};

void start();
