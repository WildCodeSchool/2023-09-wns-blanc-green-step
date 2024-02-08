import { useState } from "react";
import ExpenseElement from "@/components/dashboard/ExpenseElement";

function MyExpenses() {
  const carbonExpenses = [
    {
      id: 1,
      title: "Titre Super",
      date: "12/02/2024",
      emission: 50,
      carbon_saving: 60,
    },
    {
      id: 2,
      title: "Titre",
      date: "12/02/2024",
      emission: 50,
      carbon_saving: 60,
    },
    {
      id: 3,
      title: "Titre",
      date: "12/02/2024",
      emission: 50,
      carbon_saving: 60,
    },
    {
      id: 4,
      title: "Titre",
      date: "12/02/2024",
      emission: 50,
      carbon_saving: 60,
    },
    {
      id: 5,
      title: "Titre",
      date: "12/02/2024",
      emission: 50,
      carbon_saving: 60,
    },
  ];

  const [filters, setFilters] = useState<{ title: string }>({
    title: "",
  });

  const filterOptions = (expense: any) =>
    filters.title
      .trim()
      .split(" ")
      .some((element) =>
        expense.title
          .toLowerCase()
          .split(" ")
          .some((el: string) => el.startsWith(element.toLowerCase()))
      ) &&
    expense.title.toLowerCase().includes(filters.title.trim().toLowerCase());

  return (
    <section className="font-poppins pt-10 text-center bg-grey-100 text-gray-20 flex flex-col items-center">
      <h1 className="font-bold italic text-xl sm:text-4xl text-center mb-12 relative sm:w-fit after:absolute after:w-full after:inset-x-0 after:bottom-[-8px] after:scale-x-105 sm:after:bottom-[-5px] after:h-5 after:bg-secondary-10 z-[1] after:z-[-1]">
        Mes Dépenses Carbones
      </h1>

      <label
        className="mb-12 text-gray-10 sm:self-end relative flex
      items-center justify-center"
      >
        <img
          className="absolute right-4"
          src="/images/magnifer.png"
          alt="Search icon"
        />
        <input
          className="bg-gray-80 py-3 px-8 pl-12 placeholder:text-gray-40 rounded-3xl"
          type="search"
          placeholder="Recherche"
          onChange={(e) => setFilters({ ...filters, title: e.target.value })}
        />
      </label>

      <div className="grid grid-cols-expenses bg-orange-100 justify-items-center items-center">
        <p className="bg-orange-90 w-full h-full py-2 border-r border-gray-60 px-8 font-semibold">
          Nom de la dépense carbone
        </p>
        <p className="bg-orange-90 w-full h-full py-2 border-r border-gray-60 px-8 font-semibold">
          Type d&apos;activité
        </p>
        <p className="bg-orange-90 w-full h-full py-2 border-r border-gray-60 px-8 font-semibold">
          Tonnes CO2 eq
        </p>
        <p className="bg-orange-90 w-full h-full py-2 border-r border-gray-60 px-8 font-semibold">
          Date
        </p>
        <p className="bg-orange-90 w-full  h-full" />
        {carbonExpenses
          .filter((expense) => filterOptions(expense))
          .map((expense) => (
            <ExpenseElement key={expense.id} expense={expense} />
          ))}
      </div>
    </section>
  );
}

export default MyExpenses;
