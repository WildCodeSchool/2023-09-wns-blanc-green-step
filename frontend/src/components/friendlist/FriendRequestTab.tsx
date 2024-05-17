import { UserFriend } from "@/types/user.type";
import FriendRequestCard from "./FriendRequestCard";

export default function FriendRequestTab({
  array,
  isFirstTabOpen,
}: {
  array: UserFriend[];
  isFirstTabOpen: boolean;
}) {
  const lastRequest = array[array.length - 1].id;
  return (
    <>
      {isFirstTabOpen
        ? array.map((friend) => (
            <FriendRequestCard
              friend={friend}
              key={friend.request_id}
              isFirstTabOpen={isFirstTabOpen}
              lastRequest={lastRequest}
            />
          ))
        : array.map((friend) => (
            <FriendRequestCard
              friend={friend}
              key={friend.request_id}
              isFirstTabOpen={isFirstTabOpen}
              lastRequest={lastRequest}
            />
          ))}
    </>
  );
}
