import { Dispatch, SetStateAction } from "react";

export default function FriendSearchBar({
  filters,
  setFilters,
}: {
  filters: { username: string };
  setFilters: Dispatch<
    SetStateAction<{
      username: string;
    }>
  >;
}) {
  return (
    <label
      className="xl:mb-12 text-gray-10 sm:self-end relative flex
        items-center justify-center sm:pr-8"
    >
      <img
        className="absolute mt-8 right-4 sm:right-12"
        src="/images/magnifer.png"
        alt="Search icon"
      />

      <input
        className="bg-gray-80 py-3 px-8 pl-12 placeholder:text-gray-40 rounded-3xl mt-8"
        type="search"
        name="search"
        placeholder="Rechercher un ami"
        onChange={(e) => setFilters({ ...filters, username: e.target.value })}
      />
    </label>
  );
}
