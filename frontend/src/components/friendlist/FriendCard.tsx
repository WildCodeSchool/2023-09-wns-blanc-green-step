import { UserFriend } from "@/types/user.type";

export const FriendCard = ({ friend }: { friend: UserFriend }) => {
  return (
    <div
      key={friend.id}
      className="flex justify-center items-center gap-4 w-52 ml-4 mr-4"
    >
      <img
        className="w-16 self-center mb-2 rounded-full object-cover"
        src={friend.image || "/images/blank-avatar.png"}
        alt={`${friend.username} avatar`}
      />
      <p>
        {friend.username.length <= 12
          ? friend.username
          : friend.username.slice(0, 9) + "..."}
      </p>

      <img
        className="ml-auto rotate-90 w-4"
        src="/images/expense-dots.png"
        alt="dot picture button"
      />
    </div>
  );
};
