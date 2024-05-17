import { UserFriend } from "@/types/user.type";
import Image from "next/image";
import acceptIcon from "@/assets/friendlist-icons/accept-friend.svg";
import deleteIcon from "@/assets/friendlist-icons/delete-friend.svg";
import refuseIcon from "@/assets/friendlist-icons/refuse-friend.svg";

export default function FriendRequestCard({
  friend,
  isFirstTabOpen,
  lastRequest,
}: {
  friend: UserFriend;
  isFirstTabOpen: boolean;
  lastRequest: number;
}) {
  return (
    <>
      <p
        className={`
        col-span-2 flex items-center gap-6
        ${lastRequest === friend.id ? "mb-2" : ""}
        `}
      >
        <img
          className="w-16 self-center mb-2"
          src={friend.avatar || "/images/blank-avatar.png"}
          alt={`${friend.username} avatar`}
        />

        {friend.username}

        {isFirstTabOpen ? (
          <Image
            src={acceptIcon}
            alt={`Accept ${friend.username} Icon`}
            className="h-6 ml-auto w-auto cursor-pointer mr-2"
          />
        ) : (
          ""
        )}

        <Image
          src={!isFirstTabOpen ? deleteIcon : refuseIcon}
          alt={`${!isFirstTabOpen ? "Delete Request for" : "Refuse"} ${
            friend.username
          } Icon`}
          className={`h-6 w-auto cursor-pointer ${
            !isFirstTabOpen ? "mr-[5px] ml-auto" : ""
          }`}
        />
      </p>

      {lastRequest !== friend.id ? (
        <span className="col-span-2 bg-gray-70 h-[1px] blur-[1px]"> </span>
      ) : (
        ""
      )}
    </>
  );
}
