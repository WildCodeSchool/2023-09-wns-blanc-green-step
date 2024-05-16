import { UserFriend } from "@/types/user.type";
import FriendRequestCard from "./FriendRequestCard";

export default function FriendRequestTab({
  array,
  isFirstTabOpen,
}: {
  array: UserFriend[];
  isFirstTabOpen: boolean;
}) {
  console.log(array);
  return (
    <>
      {isFirstTabOpen
        ? array.map((friend) => (
            <FriendRequestCard
              friend={friend}
              key={friend.id}
              isFirstTabOpen={isFirstTabOpen}
            />
          ))
        : array.map((friend) => (
            <FriendRequestCard
              friend={friend}
              key={friend.id}
              isFirstTabOpen={isFirstTabOpen}
            />
          ))}
    </>
  );
}
