import Link from "next/link";

function NavBoard() {
  return (
    <nav className="fixed z-10 right-0 top-0 p-5 sm:left-0 bg-green-60 w-fit flex flex-col gap-5 mt-20 sm:mt-0 sm:w-96 text-gray-30 rounded-xl sm:rounded-none sm:h-screen">
      <Link href="/" className="hidden sm:flex gap-8 items-center">
        <img className="w-16" src="/images/logo.png" alt="Green Step Logo" />

        <h3 className="font-bold">Green Step</h3>
      </Link>

      <img
        className="w-32 sm:w-52 self-center mb-2"
        src="/images/blank-avatar.png"
        alt="blank avatar"
      />
      <p className="font-medium self-center text-sm sm:text-base mb-4 sm:mb-8 ">
        Bienvenue Jean-Paul !
      </p>

      <ul className="font-medium self-center text-sm sm:text-base">
        <Link href="/my-expenses">
          <li className="flex gap-4 items-center">
            <img src="/images/carbon-expenses.png" alt="Carbon Expenses Icon" />
            Mes Dépenses Carbones
          </li>
        </Link>
      </ul>
    </nav>
  );
}

export default NavBoard;
