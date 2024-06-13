import { UserFriend } from "@/types/user.type";
import FriendRequestCard from "./FriendRequestCard";

export default function FriendRequestTab({
  array,
  isFirstTabOpen,
  filterArrayOnDelete,
}: {
  array: UserFriend[];
  isFirstTabOpen: boolean;
  filterArrayOnDelete: (id: number) => void;
}) {
  const lastRequest = array[array.length - 1].id;

  return (
    <>
      {array.map((friend) => (
        <FriendRequestCard
          friend={friend}
          key={friend.request_id}
          isFirstTabOpen={isFirstTabOpen}
          lastRequest={lastRequest}
          filterArrayOnDelete={filterArrayOnDelete}
        />
      ))}
    </>
  );
}
