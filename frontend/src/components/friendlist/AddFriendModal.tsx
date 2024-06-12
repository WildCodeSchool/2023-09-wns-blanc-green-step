import { useContext, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { Button } from "../Button";
import { gql, useMutation, useQuery } from "@apollo/client";
import { UserToAdd } from "@/types/user.type";

const GET_USERS = gql`
  query GetUsers {
    getUsers {
      id
      username
    }
  }
`;

const ADD_FRIEND = gql`
  mutation Mutation($friendId: Float!, $userId: Float!) {
    addFriend(friend_id: $friendId, user_id: $userId) {
      id
      is_accepted
      user_one {
        id
        image
        username
      }
      user_two {
        id
        image
        username
      }
    }
  }
`;

export function AddFriendModal({ closeModal }: { closeModal: () => void }) {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState<UserToAdd[]>([]);
  const [friendUsername, setFriendUsername] = useState<string>("");
  const [friendId, setFriendId] = useState<number>(0);

  const [addNewFriend] = useMutation(ADD_FRIEND);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (friendId !== 0 && friendUsername !== "") {
      addNewFriend({
        variables: {
          friendId: Number(friendId),
          userId: user.id,
        },
        onCompleted: () => {
          closeModal();
        },
      });
    }
  };

  const handleChange = (e: any) => {
    setFriendUsername(e.target.value);
    setFriendId(
      users.filter(
        (filteredUser) => filteredUser.username === e.target.value
      )[0]?.id
    );
  };

  const { loading, error } = useQuery(GET_USERS, {
    onCompleted: (data: any) => {
      setUsers(
        data.getUsers.filter((userFromList: any) => userFromList.id !== user.id)
      );
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <dialog
      open
      className="absolute z-[5] left-2/4 top-2/4 bg-blue-90 translate-x-[-50%] translate-y-[-50%] rounded-lg grid px-8 py-4 gap-y-6"
    >
      <p
        className="absolute top-0 right-1 cursor-pointer p-2"
        onClick={() => closeModal()}
      >
        X
      </p>
      <label>
        Friend:
        <input
          name="friend"
          value={friendUsername}
          onChange={(e: any) => handleChange(e)}
        />
      </label>

      <Button
        content="Ajouter l'ami"
        color="bg-green-60"
        textsize="text-md"
        onClick={(e: any) => handleSubmit(e)}
      />
    </dialog>
  );
}
