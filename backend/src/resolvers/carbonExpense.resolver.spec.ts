import { ApolloServer, gql } from "apollo-server";
import createServer from "../config/server";

const tokenContext: { token?: string } = {};

describe("CarbonExpense resolver", () => {
  let server: ApolloServer;
  beforeAll(async () => {
    server = await createServer(() => tokenContext);
  });

  it("Login & add expense", async () => {
    const login = gql`
    mutation Login($password: String!, $email: String!) {
      login(password: $password, email: $email)
    }
    `;

    const responseLogin = await server.executeOperation({
      query: login,
      variables: {
        password: "123",
        email: "123@gmail.com"
      }
    });

    expect(responseLogin).toBeDefined();
    tokenContext.token = responseLogin.data?.login;

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

    const response = await server.executeOperation({
      query: carbonExpenseMustationCreate,
      variables: {
        expense: {
          title: "Test By Jest",
          date: "2024-03-02",
          emission: 0,
          activityType: 4
        }
      }
    });

    expect(response.errors).toBeUndefined();
    expect(response.data?.createCarbonExpense).toBeDefined();
    expect(response.data?.createCarbonExpense.id).toBeGreaterThan(0);
  });
})