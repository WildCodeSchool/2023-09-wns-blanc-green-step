import { createContext, useState, useMemo } from "react";

const AuthContext = createContext({
  user: { id: 0, username: "" },
  setUser: (user: { id: number; username: string }) => {},
});

function AuthContextProvider({ children }) {
  const [user, setUser] = useState({ id: 0, username: "" });

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
