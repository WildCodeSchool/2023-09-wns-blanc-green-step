import { useContext, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import { jwtDecode } from "jwt-decode";

const LOGIN = gql`
  mutation Mutation($password: String!, $email: String!) {
    login(password: $password, email: $email)
  }
`;

export default function LoginPage() {
  const { user, setUser } = useContext(AuthContext);
  const router = useRouter();
  const [credential, setCredential] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [login] = useMutation(LOGIN, {
    variables: {
      email: credential,
      password,
    },
    onCompleted(data: any) {
      localStorage.setItem("token", data.login);
      const { id } = jwtDecode(data.login);
      setUser({ id: id, username: "" });
      router.push("/my-expenses");
    },
  });

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    login();
  };

  return (
    <div>
      <div className="w-1/2">
        <div>
          <img src="/images/photo-accueil.png" alt="image" />
        </div>
      </div>
      <div className="w-1/2">
        <div className="flex flex-col"></div>
        <input
          className="border"
          placeholder="Username or Email"
          onChange={(e) => {
            setCredential(e.target.value);
          }}
        />
        <br />
        <input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <br />
        <button className="border" onClick={(e) => handleSubmit(e)}>
          Login
        </button>
      </div>
    </div>
  );
}
