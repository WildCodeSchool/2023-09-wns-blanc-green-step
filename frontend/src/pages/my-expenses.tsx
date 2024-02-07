import { Fragment } from "react";

function MyExpenses() {
  const carbonExpenses = [
    {
      id: 1,
      title: "Titre",
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
  // after:w-full after: after:h-5 after:bg-secondary-10 after:mt-5

  return (
    <section className="pt-10 text-center bg-grey-100 text-gray-20 flex flex-col items-center">
      <h1 className="font-poppins font-bold italic text-xl sm:text-4xl text-center mb-12 relative sm:w-fit after:absolute after:w-full after:inset-x-0 after:bottom-[-8px] after:scale-x-105 sm:after:bottom-[-5px] after:h-5 after:bg-secondary-10 z-[1] after:z-[-1]">
        Mes Dépenses Carbones
      </h1>

      <label className="mb-12 self-end">
        <input type="search" placeholder="Hinted search text" />
      </label>

      <div className="grid grid-cols-expenses bg-orange-100 justify-items-center items-center">
        <p className="bg-orange-90 w-full py-2 px-8">
          Nom de la dépense carbone
        </p>
        <p className="bg-orange-90 w-full py-2 px-8">Type d&apos;activité</p>
        <p className="bg-orange-90 w-full py-2 px-8">Tonnes CO2 eq</p>
        <p className="bg-orange-90 w-full py-2 px-8">Date</p>
        <p className="bg-orange-90 w-full  h-full" />
        {carbonExpenses.map((expense) => (
          <Fragment key={expense.id}>
            <p className="py-2">{expense.title}</p>
            <p className="py-2">Tansports</p>
            <p className="py-2">{expense.emission}</p>
            <p className="py-2">{expense.date}</p>
            <img
              className="w-9 py-2"
              src="/images/edit-button.png"
              alt={`Edit Expense ${expense.title} Button`}
            />
          </Fragment>
        ))}
      </div>
    </section>
  );
}

export default MyExpenses;
