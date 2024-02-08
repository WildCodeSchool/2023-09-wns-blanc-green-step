function ExpenseElement({ expense }) {
  return (
    <>
      <p className="py-2 border-r border-gray-60 px-8 w-full h-full">
        {expense.title}
      </p>
      <p className="py-2 border-r border-gray-60 px-8 w-full h-full">
        Tansports
      </p>
      <p className="py-2 border-r border-gray-60 px-8 w-full h-full">
        {expense.emission}
      </p>
      <p className="py-2 border-r border-gray-60 px-8 w-full h-full">
        {expense.date}
      </p>
      <img
        className="w-9 py-2"
        src="/images/edit-button.png"
        alt={`Edit Expense ${expense.title} Button`}
      />
    </>
  );
}

export default ExpenseElement;
