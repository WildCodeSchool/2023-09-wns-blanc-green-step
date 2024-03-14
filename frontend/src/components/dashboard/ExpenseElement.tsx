import ExpenseCard from "@/components/dashboard/ExpenseCard";
import { Expense } from "@/types/expense.type";
import { useState } from "react";

function ExpenseElement({ expense }: { expense: Expense }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleMobileExpenseCardOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <article className="sm:hidden p-8 bg-orange-90 flex justify-between rounded-2xl gap-2 w-4/5">
        <p className="font-medium text-lg">{expense.title}</p>
        <button onClick={handleMobileExpenseCardOpen}>
          <img
            src="/images/expense-dots.png"
            alt={`Open ${expense.title} Button`}
          />
        </button>
      </article>
      <div
        className={`${
          isOpen
            ? "fixed top-24 z-[4] h-full w-full bg-[#989898] opacity-50 backdrop-blur-lg"
            : "hidden"
        } sm:hidden`}
      ></div>
      <ExpenseCard
        expense={expense}
        isOpen={isOpen}
        handleMobileExpenseCardOpen={() => handleMobileExpenseCardOpen()}
      />
    </>
  );
}

export default ExpenseElement;
