import { Expense } from "@/types/expense.type";
import ModalUpdateCarbonExpense from "./ModalUpdateCarbonExpense";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";


function ExpenseCard({
  expense,
  isOpen,
  handleMobileExpenseCardOpen,
}: {
  expense: Expense;
  isOpen: boolean;
  handleMobileExpenseCardOpen: Function;
}) {
  const [isPopUp, setIsPopUp] = useState(false);

  const openModal = () => {
    setIsPopUp(true);
  };
  const closeModal = () => {
    setIsPopUp(false);
  };
  return (
    <article
      className={`${
        isOpen
          ? "flex max-sm:fixed max-sm:top-2/4 max-sm:translate-y-[-50%] max-sm:z-[5]"
          : "hidden"
      } sm:flex sm:static p-8 bg-orange-90 flex-col items-center rounded-2xl gap-2 w-[292px]`}
    >
      <h3 className="font-bold italic text-2xl text-center mb-12 relative sm:w-fit after:absolute after:w-full after:inset-x-0 after:bottom-[-8px] after:scale-x-105 sm:after:bottom-[-5px] after:h-5 after:bg-orange-40 z-[1] after:z-[-1]">
        {expense.title}
      </h3>
      <p
        className="text-2xl font-bold absolute top-6 right-6 sm:hidden"
        onClick={() => handleMobileExpenseCardOpen()}
      >
        X
      </p>
      <p className="mb-2 font-medium text-lg">
        Type d&apos;activité: {expense.activityType.name}
      </p>
      <p className="mb-2 font-medium text-lg">
        Tonnes CO2 eq: {expense.emission}
      </p>
      <p className="mb-2 font-medium text-lg">
        Date: {expense.date.split("T")[0]}
      </p>
      <img
        className="mt-auto"
        src={expense.activityType.icon}
        alt={expense.activityType.name}
      />
        <button
          id="updateExpense"
          className="self-end"
          type="button"
          onClick={openModal}
        >
          <img
            src="/images/edit-button.png"
            alt={`Edit Expense ${expense.title} Button`}
          />
        </button>
      <div>
        {isPopUp ? (
          <ModalUpdateCarbonExpense
            expense={expense}
            isOpen={isPopUp}
            onClose={closeModal}
          ></ModalUpdateCarbonExpense>
        ) : (
          ""
        )}
      </div>
    </article>
  );
}

export default ExpenseCard;
