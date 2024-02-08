import { createContext, useState, useMemo } from "react";

const AuthContext = createContext({
  user: { id: 0 },
  setUser: (user: { id: number }) => {},
});

function AuthContextProvider({ children }) {
  const [user, setUser] = useState({ id: 0 });

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
