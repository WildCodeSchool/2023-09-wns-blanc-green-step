import { ApolloServer, gql } from "apollo-server";
import createServer from "../config/server";

const tokenContext: {token?: string} = {};

describe("CarbonExpense resolver", () => {
  let server: ApolloServer;
  beforeAll(async () => {
    server = await createServer(() => tokenContext);
  });

  // it("Login", async () => {
  //   const login = gql`
  //   mutation Login($password: String!, $email: String!) {
  //     login(password: $password, email: $email)
  //   }
  //   `;

  //   const responseLogin = await server.executeOperation({
  //     query: login,
  //     variables: {
  //       password: "123",
  //       email: "123@gmail.com"
  //     }
  //   })
  //   expect(responseLogin.data?.login).toBe("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzEwMzI1NDU4LCJleHAiOjE3MTAzMjkwNTh9.b7nRx1GIHg5r0UjI74Oe_J-qIZ7mbsi97hKRu7q3HuE");
  // });

  tokenContext.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzEwMzI1NDU4LCJleHAiOjE3MTAzMjkwNTh9.b7nRx1GIHg5r0UjI74Oe_J-qIZ7mbsi97hKRu7q3HuE"

  it("Create a expense", async () => {
    const carbonExpenseMustationCreate = gql`
            mutation Mutation($expense: CreateCarbonExpenseType!) {
                createCarbonExpense(expense: $expense) {
                id
                title
                date
                emission
                carbon_saving
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
          carbon_saving: 0,
          activityType: 4
        }
      }
    });


    // console.log(response.data?.login)

    expect(response.errors).toBeUndefined();
    expect(response.data?.createCarbonExpense).toBeDefined();
    expect(response.data?.createCarbonExpense.id).toBeGreaterThan(0);
  })
})