import { ApolloServer, gql } from "apollo-server";
import createServer from "../config/server";

const tokenContext: { token?: string } = {};

describe("CarbonExpense resolver", () => {
  let server: ApolloServer;
  beforeAll(async () => {
    server = await createServer(() => tokenContext);
  });

  afterAll(async () => {
    await server?.stop();
  });

  it("Create user, login user, create activity type & add expense", async () => {
    const register = gql`
      mutation Mutation(
        $password: String!
        $email: String!
        $username: String!
      ) {
        register(password: $password, email: $email, username: $username) {
          username
          email
          password
        }
      }
    `;

    const responseRegister = await server.executeOperation({
      query: register,
      variables: {
        password: "123",
        email: "123@gmail.com",
        username: "123",
      },
    });

    expect(responseRegister).toBeDefined();

    const login = gql`
      mutation Login($password: String!, $email: String!) {
        login(password: $password, email: $email)
      }
    `;

    const responseLogin = await server.executeOperation({
      query: login,
      variables: {
        password: "123",
        email: "123@gmail.com",
      },
    });

    expect(responseLogin).toBeDefined();
    tokenContext.token = responseLogin.data?.login;

    const activityTypeMutationCreate = gql`
      mutation Mutation($activityType: CreateActivityType!) {
        createActivityType(activityType: $activityType) {
          id
          name
        }
      }
    `;

    const responseActivity = await server.executeOperation({
      query: activityTypeMutationCreate,
      variables: {
        activityType: {
          name: "Transport",
          icon: "&#x1F6E9",
          carbon_emission: 0,
        },
      },
    });

    expect(responseActivity.errors).toBeUndefined();
    expect(responseActivity.data?.createActivityType).toBeDefined();
    expect(responseActivity.data?.createActivityType.id).toBeGreaterThan(0);

    const carbonExpenseMustationCreate = gql`
      mutation Mutation($expense: CreateCarbonExpenseType!) {
        createCarbonExpense(expense: $expense) {
          id
          title
          date
          emission
          activityType {
            id
          }
        }
      }
    `;

    const responseCarbon = await server.executeOperation({
      query: carbonExpenseMustationCreate,
      variables: {
        expense: {
          title: "Test By Jest",
          date: "2024-03-02",
          emission: 0,
          activityType: 1,
        },
      },
    });

    expect(responseCarbon.errors).toBeUndefined();
    expect(responseCarbon.data?.createCarbonExpense).toBeDefined();
    expect(responseCarbon.data?.createCarbonExpense.id).toBeGreaterThan(0);
  });
});
