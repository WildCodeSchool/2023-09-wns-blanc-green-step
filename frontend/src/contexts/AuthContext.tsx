import { createContext, useState, useMemo, useEffect } from "react";

import { gql, useLazyQuery, useMutation } from "@apollo/client";

const GET_USER_BY_ID = gql`
  query Query($getUserByIdId: Float!) {
    getUserById(id: $getUserByIdId) {
      id
      username
      email
      password
      image
    }
  }
`;

const AuthContext = createContext({
  user: { id: 0, username: "" },
  setUser: (user: { id: number; username: string }) => {},
});

function AuthContextProvider({ children }) {
  const [user, setUser] = useState({ id: 0, username: "" });

  const [getUser] = useLazyQuery(GET_USER_BY_ID, {
    variables: {
      getUserByIdId: Number(user.id),
    },
    onCompleted: (userData: any) => {
      setUser(userData.getUserById);
    },
  });

  useEffect(() => {
    if (user.id !== 0) {
      getUser();
    }
  }, [user]);

  const userMemo = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user, setUser]
  );

  return (
    <AuthContext.Provider value={userMemo}>{children}</AuthContext.Provider>
  );
}

export { AuthContext, AuthContextProvider };
