import { useState } from "react";
import { gql, useMutation } from "../../node_modules/@apollo/client/index";
import { useRouter } from "../../node_modules/next/router";


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
        password
    },
    onCompleted(data: any) {
        router.push("/");
    }
    
})

const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    register();
  };

    return (
        <div>
            <div className="w-1/2">
                <div>
                    <img src="/images/photo-accueil.png" alt="image" />
                </div>
            </div>
            <div className="w-1/2">
                <div className="flex flex-row">
                    <input className="border bg" placeholder="Nom d'utilisateur" onChange={(e) => {
                    setUsername(e.target.value);
                    }}/>
                    <input className="border" placeholder="Email" onChange={(e) => {
                    setEmail(e.target.value);
                    }}/>
                </div>
            <br/>
                <div className="flex flex-row">
                    <input className="border" type="password" placeholder="Mot de passe" onChange={(e) => {
                    setPassword(e.target.value);
                    }}/>   
            <br/>
                    {/* <input className="border" type="password" placeholder="Confirmer mot de passe" onChange={(e) => {
                    setPassword(e.target.value);
                    }}/>    */}
                </div>
            <br/>
                <button className="border" onClick={(e) => handleSubmit(e)}>Register</button>
            </div>
        </div>
    );
}