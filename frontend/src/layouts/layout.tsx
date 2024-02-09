import NavBoard from "@/components/dashboard/NavBoard";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";

export default function Layout({ children }) {
  const { user } = useContext(AuthContext);

  return (
    <>
      {user.id !== 0 ? <NavBoard /> : ""}
      <main
        className={`min-h-screen pt-10 bg-gray-100 flex-col items-center justify-start ${
          user.id !== 0
            ? "sm:absolute sm:right-0 sm:top-0 sm:w-dashcontent"
            : ""
        }`}
      >
        {children}
      </main>
    </>
  );
}