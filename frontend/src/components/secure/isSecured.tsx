import { useRouter } from "next/router";
import { useEffect } from "react";

export default function isSecured(Component: any) {
  return function IsSecured(props: any) {
    const router = useRouter();
    const token = localStorage.getItem("token");

    useEffect(() => {
      if (!token) {
        router.push("/login");
      }
    }, []);

    if (!token) {
      return null;
    }

    return <Component {...props} />;
  };
}
