import { useRouter } from "next/router";
import { useEffect } from "react";

export default function isLogged(Component: any) {
  return function IsLogged(props: any) {
    const router = useRouter();
    const token = localStorage.getItem("token");

    useEffect(() => {
      if (!token) {
        router.push("/signin");
      }
    }, []);

    if (!token) {
      return null;
    }

    return <Component {...props} />;
  };
}
