import FriendCard from "@/components/friendlist/FriendCard";
import { UserFriend } from "@/types/user.type";

export default function FriendsPage() {
  const friendsArray: UserFriend[] = [
    {
      id: 1,
      username: "Jean-Eude",
      avatar: "/images/blank-avatar.png",
    },
    {
      id: 2,
      username: "Jean-Jacques",
      avatar: "/images/blank-avatar.png",
    },
    {
      id: 3,
      username: "Jean-Jean",
      avatar: "/images/blank-avatar.png",
    },
    {
      id: 4,
      username: "Jean-René",
      avatar: "/images/blank-avatar.png",
    },
    {
      id: 5,
      username: "Jean-Bertrand",
      avatar: "/images/blank-avatar.png",
    },
    {
      id: 6,
      username: "Jean-Vincent",
      avatar: "/images/blank-avatar.png",
    },
    {
      id: 7,
      username: "Jean-Benoît",
      avatar: "/images/blank-avatar.png",
    },
    {
      id: 8,
      username: "Jean-Gérard",
      avatar: "/images/blank-avatar.png",
    },
  ];

  return (
    <>
      <section className="font-poppins pt-10 text-center text-gray-20 flex items-center justify-center pb-16 sm:pl-[17px]">
        <h1 className="font-bold italic text-xl sm:text-4xl text-center mb-12 relative sm:w-fit after:absolute after:w-full after:inset-x-0 after:bottom-[-8px] after:scale-x-105 sm:after:bottom-[-5px] after:h-5 after:bg-secondary-10 z-[1] after:z-[-1]">
          Mes Contacts
        </h1>
      </section>
      <section className="flex flex-col sm:flex-row sm:flex-wrap items-center sm:items-stretch gap-5 sm:gap-y-12 sm:gap-x-16 w-full sm:w-[90%] sm:m-auto sm:justify-center mb-12">
        {friendsArray.map((friend) => (
          <FriendCard friend={friend} key={friend.id} />
        ))}
      </section>
    </>
  );
}
