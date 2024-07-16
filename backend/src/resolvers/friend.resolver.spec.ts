import { ApolloServer, gql } from "apollo-server";
import createServer from "../config/server";

const tokenContext: { token?: string } = {};

describe("CarbonExpense resolver", () => {
  let server: ApolloServer;
  beforeAll(async () => {
    server = await createServer(() => tokenContext);
  });

  it("Create two user, login user, create activity type & add expense", async () => {
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

    const responseRegisterTwo = await server.executeOperation({
      query: register,
      variables: {
        password: "456",
        email: "456@gmail.com",
        username: "456",
      },
    });

    expect(responseRegisterTwo).toBeDefined();

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

    const ADD_FRIEND = gql`
      mutation Mutation($friendId: Float!, $userId: Float!) {
        addFriend(friend_id: $friendId, user_id: $userId) {
          id
          is_accepted
          user_one {
            id
            image
            username
          }
          user_two {
            id
            image
            username
          }
        }
      }
    `;

    const responseFriendRequest = await server.executeOperation({
      query: ADD_FRIEND,
      variables: {
        friendId: 1,
        userId: 2,
      },
    });

    console.log(responseFriendRequest.data);

    expect(responseFriendRequest.errors).toBeUndefined();
    expect(responseFriendRequest.data?.addFriend).toBeDefined();
    expect(responseFriendRequest.data?.addFriend.id).toBeGreaterThan(0);
  });
});
