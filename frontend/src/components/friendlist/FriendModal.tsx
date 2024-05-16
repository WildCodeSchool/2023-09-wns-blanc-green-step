import { UserFriend } from "@/types/user.type";
import { useState } from "react";
import FriendRequestTab from "./FriendRequestTab";

export default function FriendModal({
  friendsArray,
}: {
  friendsArray: UserFriend[];
}) {
  const [isFirstTabOpen, setIsFirstTabOpen] = useState<boolean>(true);

  const friendsRequestsReceived = friendsArray
    .map((friend) =>
      !friend.is_requested_by_user && !friend.is_accepted ? friend : null
    )
    .filter((elem) => elem !== null);

  const friendsRequestsSent = friendsArray
    .map((friend) =>
      friend.is_requested_by_user && !friend.is_accepted ? friend : null
    )
    .filter((elem) => elem !== null);

  return (
    <>
      <div className="fixed top-0 z-[4] h-full w-full bg-opacity-50 backdrop-blur-[8px]"></div>
      <dialog
        open
        //       backdrop-blur-[20px]
        className="absolute z-[5] left-2/4 top-2/4 bg-blue-90 translate-x-[-50%] translate-y-[-50%] rounded-lg grid px-8 py-4 gap-y-4"
      >
        <h2
          className={`col-start-1 text-center border-b border-grey-30 p-2 pr-7 transition-all duration-300 ${
            isFirstTabOpen
              ? "after:absolute after:top-[54px] after:left-[6.6%] after:w-[43.4%]  after:h-1 after:bg-blue-10 after:z-[-1]"
              : ""
          }`}
          onClick={() => setIsFirstTabOpen(true)}
        >
          Mes Demandes Reçues
        </h2>
        <h2
          className={`col-start-2 text-center border-b border-grey-30 p-2 pl-7 transition-all duration-300 ${
            isFirstTabOpen
              ? ""
              : "after:absolute after:top-[54px] after:right-[6.6%] after:w-[43.4%] after:h-1 after:bg-blue-10 after:z-[-1]"
          }`}
          onClick={() => setIsFirstTabOpen(false)}
        >
          Mes Demandes Envoyées
        </h2>
        <p className="absolute right-2 top-2">X</p>

        {isFirstTabOpen ? (
          <FriendRequestTab
            array={friendsRequestsReceived as UserFriend[]}
            isFirstTabOpen={isFirstTabOpen}
          />
        ) : (
          <FriendRequestTab
            array={friendsRequestsSent as UserFriend[]}
            isFirstTabOpen={isFirstTabOpen}
          />
        )}

        {/* on utilise un composant réutilisable pour les deux listes,
      on passe le tableau qu'il faut en fonction du composant
      
      Les deux valider sont un post
      Les deux refuser/delete sont un delete

      on affiche pas la même icone, si on refuse
    */}
      </dialog>
    </>
  );
}
