import { useContext, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import { jwtDecode } from "jwt-decode";
import { Button } from "@/components/Button";
import Waves from "@/components/Waves";
import { JwtPayload } from "@/types/jwtPayloadType.type";

const LOGIN = gql`
  mutation Mutation($password: String!, $email: String!) {
    login(password: $password, email: $email)
  }
`;

export default function LoginPage() {
  const { setUser } = useContext(AuthContext);
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
      const { id } = jwtDecode(data.login) as JwtPayload;
      setUser({ id: id, username: "", email: "", image: "" });
      router.push("/mon-bilan-carbone");
    },
  });

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    login();
  };

  return (
    <section>
      <div className="flex justify-center items-center flex-col">
        <h1 className="font-bold italic text-xl sm:text-3xl text-center mb-6 relative sm:w-fit after:absolute after:w-full after:inset-x-0 after:bottom-[-8px] after:scale-x-105 sm:after:bottom-[-5px] after:h-5 after:bg-secondary-10 z-[1] after:z-[-1]">
          Connecte toi !
        </h1>
        <div>
          <img
            src="/images/photo-accueil.png"
            alt="image"
            className="w-96 my-4"
          />
        </div>
        <div className="flex justify-center items-center flex-col">
          <input
            className="border-none my-2 p-2 pl-4 rounded-3xl bg-gray-80"
            placeholder="Email"
            onChange={(e) => {
              setCredential(e.target.value);
            }}
          />
          <input
            className="border-none my-2 mb-6 p-2 pl-4 rounded-3xl bg-gray-80"
            type="password"
            placeholder="Mot de passe"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Button
            content="Se connecter"
            color="bg-blue-80"
            textsize="text-md"
            onClick={(e) => handleSubmit(e)}
          />
        </div>
      </div>
      <Waves />
    </section>
  );
}
