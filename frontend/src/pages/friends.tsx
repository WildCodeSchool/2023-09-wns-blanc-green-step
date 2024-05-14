import { FriendCard } from "@/components/friendlist/FriendCard";
import { UserFriend } from "@/types/user.type";
import { useState } from "react";

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

  const [filters, setFilters] = useState<{ username: string }>({
    username: "",
  });

  const filterOptions = (friend: any) =>
    (filters.username
      .trim()
      .split(" ")
      .some((element) =>
        friend.username
          .toLowerCase()
          .split(" ")
          .some((el: string) => el.startsWith(element.toLowerCase()))
      ) ||
      filters.username
        .trim()
        .split(" ")
        .some((element) =>
          friend.username
            .toLowerCase()
            .split("-")
            .some((el: string) => el.startsWith(element.toLowerCase()))
        )) &&
    friend.username
      .toLowerCase()
      .includes(filters.username.trim().toLowerCase());

  return (
    <>
      <section className="font-poppins pt-10 text-center text-gray-20 flex flex-col items-center justify-center pb-16 sm:pl-[17px]">
        <h1 className="font-bold italic text-xl sm:text-4xl text-center mb-12 relative sm:w-fit after:absolute after:w-full after:inset-x-0 after:bottom-[-8px] after:scale-x-105 sm:after:bottom-[-5px] after:h-5 after:bg-secondary-10 z-[1] after:z-[-1]">
          Mes Contacts
        </h1>

        <label
          className="mb-12 text-gray-10 sm:self-end relative flex
      items-center justify-center sm:pr-8"
        >
          <img
            className="absolute right-4 sm:right-12"
            src="/images/magnifer.png"
            alt="Search icon"
          />

          <input
            className="bg-gray-80 py-3 px-8 pl-12 placeholder:text-gray-40 rounded-3xl"
            type="search"
            placeholder="Recherche"
            onChange={(e) =>
              setFilters({ ...filters, username: e.target.value })
            }
          />
        </label>
      </section>
      <section className="flex flex-col sm:flex-row sm:flex-wrap items-center sm:items-stretch gap-5 sm:gap-y-12 sm:gap-x-16 w-full sm:w-[90%] sm:m-auto sm:justify-center mb-12">
        {friendsArray
          .filter((friend) => filterOptions(friend))
          .map((friend) => (
            <FriendCard friend={friend} key={friend.id} />
          ))}
      </section>
    </>
  );
}
