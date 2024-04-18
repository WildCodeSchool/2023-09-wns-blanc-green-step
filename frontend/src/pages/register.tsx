import { useState } from "react";
import { gql, useMutation } from "../../node_modules/@apollo/client/index";
import { useRouter } from "../../node_modules/next/router";
import { Button } from "@/components/Button";
import Header from "@/components/Header";
import Waves from "@/components/Waves";

const REGISTER = gql`
  mutation Register($password: String!, $username: String!, $email: String!) {
    register(password: $password, username: $username, email: $email) {
      id
      email
      username
      password
      image
    }
  }
`;

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [register] = useMutation(REGISTER, {
    variables: {
      username,
      email,
      password,
    },
    onCompleted(data: any) {
      router.push("/");
    },
  });

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    register();
  };

  return (
    <div>
      <div className="flex justify-center items-center flex-col">
        <h1 className="font-bold italic text-xl sm:text-3xl text-center mb-6 relative sm:w-fit after:absolute after:w-full after:inset-x-0 after:bottom-[-8px] after:scale-x-105 sm:after:bottom-[-5px] after:h-5 after:bg-secondary-10 z-[1] after:z-[-1]">
          Inscris toi !
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
            placeholder="Nom d'utilisateur"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            className="border-none my-2 p-2 pl-4 rounded-3xl bg-gray-80"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            className="border-none mt-2 mb-6 p-2 pl-4 rounded-3xl bg-gray-80"
            type="password"
            placeholder="Mot de passe"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Button
            content="S'inscrire"
            color="bg-blue-80"
            textsize="text-md"
            onClick={(e) => handleSubmit(e)}
          />
        </div>
      </div>
      <Waves />
    </div>
  );
}
