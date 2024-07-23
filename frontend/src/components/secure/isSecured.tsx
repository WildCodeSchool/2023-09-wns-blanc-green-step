import { JwtPayload } from "@/types/jwtPayloadType.type";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/contexts/AuthContext";

export default function isSecured(Component: any) {
  return function IsSecured(props: any) {
    const { setUser } = useContext(AuthContext);

    const router = useRouter();
    const token = localStorage.getItem("token");

    const handleDisconnect = () => {
      setUser({ id: 0, username: "", email: "", image: "" });
      localStorage.removeItem("token");
      router.push("/login");
    };

    useEffect(() => {
      if (!token) {
        router.push("/login");
      }

      if (token) {
        const { exp } = jwtDecode(token) as JwtPayload;

        if (exp * 1000 < Date.now()) {
          handleDisconnect();
        }
      }
    }, []);

    if (!token) {
      return null;
    }

    return <Component {...props} />;
  };
}
