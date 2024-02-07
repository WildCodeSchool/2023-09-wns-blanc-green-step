function MyExpenses() {
  const carbonExpenses = [
    { id: 1, title: "Titre", date: "", emission: 50, carbon_saving: 60 },
  ];
  // after:w-full after: after:h-5 after:bg-secondary-10 after:mt-5

  return (
    <section className="pt-10 text-center bg-grey-100 text-gray-20">
      <h1 className="font-poppins font-bold italic text-xl sm:text-4xl text-center mb-12 relative sm:w-fit after:absolute after:w-full after:inset-x-0 after:bottom-[-8px] after:scale-x-105 sm:after:bottom-[-5px] after:h-5 after:bg-secondary-10 z-[1] after:z-[-1]">
        Mes Dépenses Carbones
      </h1>

      <label>
        <input type="search" placeholder="Hinted search text" />
      </label>
    </section>
  );
}

export default MyExpenses;
