import { UserFriend } from "@/types/user.type";
import Image from "next/image";
import acceptIcon from "@/assets/friendlist-icons/accept-friend.svg";
import deleteIcon from "@/assets/friendlist-icons/delete-friend.svg";
import refuseIcon from "@/assets/friendlist-icons/refuse-friend.svg";

export default function FriendRequestCard({
  friend,
  isFirstTabOpen,
}: {
  friend: UserFriend;
  isFirstTabOpen: boolean;
}) {
  return (
    <p className="col-span-2 flex items-center gap-6">
      {friend.username}

      <Image
        src={acceptIcon}
        alt={`Accept ${friend.username} Icon`}
        className="h-6 ml-auto"
      />

      <Image
        src={isFirstTabOpen ? deleteIcon : refuseIcon}
        alt={`${isFirstTabOpen ? "Delete Request for" : "Refuse"} ${
          friend.username
        } Icon`}
        className="h-6"
      />
    </p>
  );
}
