export default function friendsPage() {
  const friendsArray = [
    {
      id: 1,
      name: "Jean-Eude",
      avatar: "/images/blank-avatar.png",
    },
    {
      id: 2,
      name: "Jean-Jacques",
      avatar: "/images/blank-avatar.png",
    },
    {
      id: 3,
      name: "Jean-Jean",
      avatar: "/images/blank-avatar.png",
    },
    {
      id: 4,
      name: "Jean-René",
      avatar: "/images/blank-avatar.png",
    },
    {
      id: 5,
      name: "Jean-Bertrand",
      avatar: "/images/blank-avatar.png",
    },
    {
      id: 6,
      name: "Jean-Vincent",
      avatar: "/images/blank-avatar.png",
    },
    {
      id: 7,
      name: "Jean-Benoît",
      avatar: "/images/blank-avatar.png",
    },
    {
      id: 8,
      name: "Jean-Gérard",
      avatar: "/images/blank-avatar.png",
    },
  ];

  return (
    <section className="flex justify-center pt-10">
      <h1 className="font-bold italic text-xl sm:text-4xl text-center mb-12 relative sm:w-fit after:absolute after:w-full after:inset-x-0 after:bottom-[-8px] after:scale-x-105 sm:after:bottom-[-5px] after:h-5 after:bg-secondary-10 z-[1] after:z-[-1]">
        Mes Contacts
      </h1>

      {friendsArray.map((friend) => (
        <div key={friend.id}>
          <img
            className="w-32 sm:w-52 self-center mb-2"
            src="/images/blank-avatar.png"
            alt="blank avatar"
          />
          <p>{friend.name}</p>
          <p>...</p>
        </div>
      ))}
    </section>
  );
}
