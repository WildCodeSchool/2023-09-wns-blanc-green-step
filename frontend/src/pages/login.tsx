import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/router";

import { useContext } from "react";

function Login() {
  const { user, setUser } = useContext(AuthContext);
  const router = useRouter();

  const handleLogin = () => {
    setUser({ ...user, id: 1 });
    router.push("/my-expenses");
  };

  return <button onClick={handleLogin}>Se Connecter</button>;
}

export default Login;
