import { UserFriend } from "@/types/user.type";
import { useState } from "react";
import FriendRequestTab from "./FriendRequestTab";

export default function FriendModal({
  friendsArray,
  closeModal,
  filterArrayOnDelete,
}: {
  friendsArray: UserFriend[];
  closeModal: () => void;
  filterArrayOnDelete: (id: number) => void;
}) {
  const [isFirstTabOpen, setIsFirstTabOpen] = useState<boolean>(true);

  const filteredFriendRequestArray = friendsArray
    .map((friend) => {
      if (
        isFirstTabOpen &&
        !friend.is_requested_by_user &&
        !friend.is_accepted
      ) {
        return friend;
      }

      if (
        !isFirstTabOpen &&
        friend.is_requested_by_user &&
        !friend.is_accepted
      ) {
        return friend;
      }

      return null;
    })
    .filter((elem) => elem !== null);

  return (
    <>
      <div className="fixed top-0 z-[4] h-full w-full bg-opacity-50 backdrop-blur-[8px]"></div>
      <dialog
        open
        //       backdrop-blur-[20px]
        className="absolute z-[5] left-2/4 top-2/4 bg-blue-90 translate-x-[-50%] translate-y-[-50%] rounded-lg grid px-8 py-4 gap-y-6"
      >
        <h2
          className={`col-start-1 text-center border-b border-grey-30 p-2 pr-7 cursor-pointer after:transition-all ${
            isFirstTabOpen
              ? "after:absolute after:top-[54px] after:left-[6.6%] after:w-[43.4%] after:h-[5px] after:bg-blue-10 after:z-[-1]"
              : ""
          }`}
          onClick={() => setIsFirstTabOpen(true)}
        >
          Mes Demandes Reçues
        </h2>
        <h2
          className={`col-start-2 text-center border-b border-grey-30 p-2 pl-7 cursor-pointer after:transition-all ${
            isFirstTabOpen
              ? ""
              : "after:absolute after:top-[54px] after:right-[6.6%] after:w-[43.4%] after:h-[5px] after:bg-blue-10 after:z-[-1]"
          }`}
          onClick={() => setIsFirstTabOpen(false)}
        >
          Mes Demandes Envoyées
        </h2>
        <p
          className="absolute top-0 right-1 cursor-pointer p-2"
          onClick={() => closeModal()}
        >
          X
        </p>

        {filteredFriendRequestArray.length > 0 ? (
          <FriendRequestTab
            array={filteredFriendRequestArray as UserFriend[]}
            isFirstTabOpen={isFirstTabOpen}
            filterArrayOnDelete={filterArrayOnDelete}
          />
        ) : (
          <p className="col-span-2 flex items-center gap-6">
            Aucune requêtes d&apos;amis {isFirstTabOpen ? "reçues" : "envoyées"}
            !
          </p>
        )}
      </dialog>
    </>
  );
}
