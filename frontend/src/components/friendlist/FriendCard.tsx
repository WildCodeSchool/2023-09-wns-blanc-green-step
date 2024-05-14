import { UserFriend } from "@/types/user.type";

export default function FriendCard({ friend }: { friend: UserFriend }) {
  return (
    <div key={friend.id} className="flex justify-center items-center gap-4">
      <img
        className="w-12 self-center mb-2"
        src={friend.avatar}
        alt="blank avatar"
      />
      <p>{friend.username}</p>
      <p>...</p>
    </div>
  );
}
