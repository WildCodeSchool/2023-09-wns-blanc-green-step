import { UserFriend } from "@/types/user.type";

export const FriendCard = ({ friend }: { friend: UserFriend }) => {
  return (
    <div
      key={friend.id}
      className="flex justify-center items-center gap-4 w-52 ml-4 mr-4"
    >
      <img
        className="w-16 self-center mb-2"
        src={friend.avatar}
        alt="blank avatar"
      />
      <p>
        {friend.username.length <= 12
          ? friend.username
          : friend.username.slice(0, 9) + "..."}
      </p>

      <img className="ml-auto rotate-90 w-4" src="/images/expense-dots.png" />
    </div>
  );
};
