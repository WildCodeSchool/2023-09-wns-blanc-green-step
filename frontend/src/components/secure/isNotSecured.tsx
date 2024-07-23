import { useRouter } from "next/router";
import { useEffect } from "react";

export default function isNotSecured(Component: any) {
  return function IsNotSecured(props: any) {
    const router = useRouter();
    const token = localStorage.getItem("token");

    useEffect(() => {
      if (token) {
        router.push("/mon-bilan-carbone");
      }
    }, []);

    if (token) {
      return null;
    }

    return <Component {...props} />;
  };
}
