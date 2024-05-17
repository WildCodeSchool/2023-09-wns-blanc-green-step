import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState, useContext } from "react";

function NavBoard() {
  const { user, setUser } = useContext(AuthContext);
  const router = useRouter();

  const [isBurger, setIsBurger] = useState(false);

  const handleDisconnect = () => {
    setUser({ id: 0, username: "", email: "", image: "" });
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <>
      <img
        className={`${
          isBurger ? "bg-gray-80" : ""
        } fixed right-0 top-0 sm:hidden p-4 m-2 rounded-xl z-10`}
        src="/images/burger-icon.png"
        alt="Burger Menu Icon"
        onClick={() => setIsBurger(!isBurger)}
      />
      <nav
        className={`${
          !isBurger ? "hidden sm:flex" : "flex"
        } fixed z-10 right-0 top-0 p-5 sm:left-0 bg-green-60 w-fit flex-col gap-5 mt-20 sm:mt-0 sm:w-96 text-gray-30 rounded-xl sm:rounded-none h-5/6 sm:h-screen`}
      >
        <Link
          href="/"
          className="hidden sm:flex gap-8 items-center sm:border-b sm:pb-6 sm:mx-2 sm:border-gray-30"
        >
          <img className="w-16" src="/images/logo.png" alt="Green Step Logo" />

          <h3 className="font-bold">Green Step</h3>
        </Link>

        <img
          className="w-32 sm:w-52 self-center mb-2"
          src={user.image || "/images/blank-avatar.png"}
          alt={`${user.username} avatar`}
        />
        <p className="font-medium self-center text-sm sm:text-base mb-4 sm:mb-8 ">
          Bienvenue {user.username} !
        </p>

        <ul className="font-medium self-center text-sm sm:text-base flex flex-col gap-5 h-full w-full p-3 sm:pl-8">
          <Link href="/mon-bilan-carbone">
            <li className="flex gap-4 items-center">
              <img
                src="/images/carbon-footprint.png"
                alt="Bilan carbon Icon"
                width={"35px"}
              />
              Mon Bilan Carbone
            </li>
          </Link>

          <Link href="/my-expenses">
            <li className="flex gap-4 items-center">
              <img
                src="/images/carbon-expenses.png"
                alt="Carbon Expenses Icon"
              />
              Mes Dépenses Carbones
            </li>
          </Link>

          <Link href="/my-ecochallenges">
            <li className="flex gap-4 items-center w-8">
              <img src="/images/target.png" alt="My ecochallenges icon" />
              Mes Eco-challenges
            </li>
          </Link>

          <Link href="/friends">
            <li className="flex gap-4 items-center">
              <img src="/images/friendlist.png" alt="Friend List Icon" />
              Mes Contacts
            </li>
          </Link>

          <Link className="mt-auto" href="/profil">
            <li className="flex gap-4 items-center">
              <img src="/images/profile-icon.png" alt="Signout Icon" />
              Mon profil
            </li>
          </Link>

          <Link className="" href="/">
            <li className="flex gap-4 items-center" onClick={handleDisconnect}>
              <img src="/images/signout.png" alt="Signout Icon" />
              Déconnexion
            </li>
          </Link>
        </ul>
      </nav>
    </>
  );
}

export default NavBoard;
