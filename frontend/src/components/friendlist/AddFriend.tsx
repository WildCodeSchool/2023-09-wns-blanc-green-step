import { useState } from "react";
import { Button } from "../Button";
import { AddFriendModal } from "./AddFriendModal";

export default function AddFriend() {
  const [isAddFriendModalOpen, setIsAddFriendModalOpen] =
    useState<boolean>(false);
  return (
    <>
      {isAddFriendModalOpen ? (
        <>
          <div className="fixed top-0 z-[4] h-full w-full bg-opacity-50 backdrop-blur-[8px]" />
          <AddFriendModal closeModal={() => setIsAddFriendModalOpen(false)} />
        </>
      ) : (
        ""
      )}

      <Button
        content="Ajouter un ami"
        color="bg-blue-60"
        textsize="text-md"
        onClick={() => setIsAddFriendModalOpen(true)}
      />
    </>
  );
}
