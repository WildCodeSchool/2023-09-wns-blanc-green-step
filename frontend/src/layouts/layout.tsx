import AddExpense from "@/components/AddExpense";
import Header from "@/components/Header";
import NavBoard from "@/components/dashboard/NavBoard";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";

export default function Layout({ children }) {
  const { user } = useContext(AuthContext);

  return (
    <>
      {user.id !== 0 ? <NavBoard /> : ""}
      <Header user={user} />
      <main
        className={`min-h-screen pt-4 ${
          user.id !== 0
            ? "sm:absolute sm:right-0 sm:top-0 sm:w-dashcontent"
            : ""
        }`}
      >
        {children}
        {user.id !== 0 ? <AddExpense /> : ""}
      </main>
    </>
  );
}
