import { Expense } from "@/types/expense.type";
function ExpenseCard({ expense }: { expense: Expense }) {
  return (
    <>
      <p className="py-2 border-r border-gray-60 px-8 w-full h-full">
        {expense.title}
      </p>
      <p className="py-2 border-r border-gray-60 px-8 w-full h-full">
        Transports
      </p>
      <p className="py-2 border-r border-gray-60 px-8 w-full h-full">
        {expense.emission}
      </p>
      <p className="py-2 border-r border-gray-60 px-8 w-full h-full">
        {expense.date}
      </p>
      <img
        className="w-9 py-2"
        src={expense.activityType.icon}
        alt={`Edit Expense ${expense.title} Button`}
      />
    </>
  );
}

export default ExpenseCard;
