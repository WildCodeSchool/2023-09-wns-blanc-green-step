import { gql, useQuery } from "@apollo/client";
import { useState, useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import ExpenseElement from "@/components/dashboard/ExpenseElement";
import { Expense } from "@/types/expense.type";

const GET_USER_EXPENSES = gql`
  query GetUserCarbonExpenses($userId: Float!) {
    getUserCarbonExpenses(userId: $userId) {
      activityType {
        id
        name
        icon
      }
      date
      emission
      id
      title
    }
  }
`;

function MyExpenses() {
  const { user } = useContext(AuthContext);
  const [carbonExpenses, setCarbonExpenses] = useState([]);

  const { loading, error } = useQuery(GET_USER_EXPENSES, {
    variables: {
      userId: Number(user.id),
    },
    onCompleted: (data: any) => {
      setCarbonExpenses(data.getUserCarbonExpenses);
    },
  });

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

      <div className="flex flex-col sm:flex-row sm:wrap items-center gap-5 w-full sm:w-[initial]">
        {carbonExpenses
          .filter((expense) => filterOptions(expense))
          .map((expense: Expense) => (
            <ExpenseElement key={expense.id} expense={expense} />
          ))}
      </div>
    </section>
  );
}

export default MyExpenses;
