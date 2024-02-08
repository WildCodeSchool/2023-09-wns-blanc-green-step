import { useContext, useState } from "react";
import { gql, useMutation } from "../../node_modules/@apollo/client/index";
import { useRouter } from "../../node_modules/next/router";




const LOGIN = gql`
Mutation Login($username: String!, $email: String!, $password: String!) {
  login(username: $username, email: $email, password: $password)
}
}`;

export default function LoginPage() {
    //const {setAuthenticated} = useContext(AuthContext)
    const router = useRouter();
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    
    const [login] = useMutation(LOGIN, {
    variables: {
        username,
        email,
        password
    },
    onCompleted(data: any)  {
        localStorage.setItem("token", data.login);
        //setAuthenticated(true);
        router.push("/");
    }
})

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
            <input className="border" placeholder="Username or Email" onChange={(e) => {
                (setUsername || setEmail)(e.target.value);
            }}/>   
            <br/>
            <input type="password" onChange={(e) => {
                setPassword(e.target.value);
            }}/>   
            <br/>
            <button className="border" onClick={(e) => handleSubmit(e)}>Login</button>
            </div>
        </div>
    );
}