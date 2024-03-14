import ExpenseCard from "@/components/dashboard/ExpenseCard";
import { Expense } from "@/types/expense.type";

function ExpenseElement({ expense }: { expense: Expense }) {
  return (
    <>
      <ExpenseCard expense={expense} />
    </>
  );
}

export default ExpenseElement;
