import "reflect-metadata";
import { dataSource } from "./config/db";
import { ApolloServer } from "apollo-server";
import * as dotenv from "dotenv";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/user.resolver";

const start = async () => {
  dotenv.config();
  const port: number = parseInt(process.env.PORT as string);
  await dataSource.initialize();

  const schema = await buildSchema({
    resolvers: [UserResolver],
    validate: { forbidUnknownValues: false },
  });

  const server = new ApolloServer({ schema });

  try {
    const { url } = await server.listen({ port });
    console.log(`Server is running on ${url}!`);
  } catch (err) {
    console.error("Error while starting the Server!");
  }
};

void start();
