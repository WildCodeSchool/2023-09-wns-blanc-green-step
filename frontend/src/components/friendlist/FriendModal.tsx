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
        className="absolute z-[5] left-2/4 top-2/4 bg-blue-90 translate-x-[-50%] translate-y-[-50%] rounded-lg grid gap-12 px-8 py-4"
      >
        <h2 className="col-start-1" onClick={() => setIsFirstTabOpen(true)}>
          Mes Demandes Reçues
        </h2>
        <h2 className="col-start-2" onClick={() => setIsFirstTabOpen(false)}>
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
