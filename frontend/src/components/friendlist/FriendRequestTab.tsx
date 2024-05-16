import { UserFriend } from "@/types/user.type";

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
        ? array.map((friend) => <p key={friend.id}>{friend.username}</p>)
        : array.map((friend) => <p key={friend.id}>{friend.username}</p>)}
    </>
  );
}
