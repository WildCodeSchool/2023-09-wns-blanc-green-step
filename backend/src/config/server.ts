import * as dotenv from "dotenv";
import { dataSource } from "./db";
import { buildSchema } from "type-graphql";
import { ActivityTypeResolver } from "../resolvers/activityType.resolver";
import { CarbonExpenseResolver } from "../resolvers/carbonExpense.resolver";
import { ChallengeResolver } from "../resolvers/challenge.resolver";
import { UserResolver } from "../resolvers/user.resolver";
import { UserChallengeResolver } from "../resolvers/userChallenge.resolver";
import { verifyToken } from "../services/auth.service";
import { getById } from "../services/user.service";
import { ApolloServer } from "apollo-server";

async function createServer(
  testContext: any = undefined
): Promise<ApolloServer> {
  dotenv.config();
  const port: number = parseInt(process.env.PORT as string);
  await dataSource.initialize();

  const schema = await buildSchema({
    resolvers: [
      ActivityTypeResolver,
      CarbonExpenseResolver,
      ChallengeResolver,
      UserResolver,
      UserChallengeResolver,
    ],
    validate: { forbidUnknownValues: false },
    authChecker: async ({ context }) => {
      try {
        const payload: any = verifyToken(context.token);
        const userFromDB = await getById(payload.id);
        context.user = userFromDB;

        return true;
      } catch (e) {
        return false;
      }
    },
  });

  return new ApolloServer({
    schema,
    // we add a context which will be used to verify auth by checking our cookie
    context: testContext
      ? testContext
      : ({ req }) => {
          // we check if the authorization headers exist and if the secret key exist
          if (
            req?.headers.authorization === undefined ||
            process.env.JWT_SECRET_KEY === undefined
          ) {
            // if not we return a void object
            return {};
          } else {
            try {
              // if it exist we get the token bearer by spliting the headers authorization
              const bearer = req.headers.authorization.split("Bearer ")[1];

              // and we return an object contaning the token bearer value
              return { token: bearer };
            } catch (e) {
              // if error we log error and return a void object
              console.log(e);
              return {};
            }
          }
        },
  });
}

export default createServer;
