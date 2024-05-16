import { UserFriend } from "@/types/user.type";
import { useEffect } from "react";

export default function FriendModal({
  friendsArray,
}: {
  friendsArray: UserFriend[];
}) {
  const friendsDemandsReceived = friendsArray
    .map((friend) =>
      !friend.is_requested_by_user && !friend.is_accepted ? friend : null
    )
    .filter((elem) => elem !== null);

  const friendsDemandsSent = friendsArray
    .map((friend) =>
      friend.is_requested_by_user && !friend.is_accepted ? friend : null
    )
    .filter((elem) => elem !== null);

  //   console.log("Sent", friendsDemandsSent);
  //   console.log("Received", friendsDemandsReceived);

  return (
    <div
      //   open
      //       backdrop-blur-[20px]
      className="absolute left-2/4 translate-x-[-50%] bg-transparent  p-4 rounded-lg"
    >
      <p className="bg-gray-100">Modal</p>

      {/* on utilise un composant réutilisable pour les deux listes,
      on passe le tableau qu'il faut en fonction du composant

      Les deux valider sont un post
      Les deux refuser/delete sont un delete

      on affiche pas la même icone, si on refuse
      */}
    </div>
  );
}
