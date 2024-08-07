import { UserToAdd } from "@/types/user.type";
import { useState } from "react";

export function AddFriendInput({
  friendUsername,
  handleChange,
  users,
}: {
  friendUsername: string;
  handleChange: (e: any) => void;
  users: UserToAdd[];
}) {
  const [suggestions, setSuggestions] = useState<UserToAdd[]>([]);

  const handleInputChange = (event: any) => {
    event.preventDefault();
    const value = event.target.value;
    handleChange(event);
    if (value.length > 0) {
      const filteredSuggestions = users.filter(
        (suggestion: any) =>
          suggestion.username.toLowerCase() !==
            event.target.value.toLowerCase() &&
          suggestion.username.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (value: any) => {
    const event = { target: { value: value.username } };
    handleChange(event);
    setSuggestions([]);
  };

  return (
    <>
      <input
        type="name"
        name="friend"
        placeholder="Search for username!"
        className="p-1 rounded-md"
        autoComplete="off"
        value={friendUsername}
        onChange={(e: any) => handleInputChange(e)}
      />
      {users.length > 0 && (
        <ul className="bg-blue-90 list-none p-0 m-0">
          {suggestions.map((user) => (
            <li
              key={user.id}
              role="option"
              aria-selected="false"
              className="p-2 cursor-pointer hover:bg-blue-70"
              onClick={() => handleSuggestionClick(user)}
            >
              {user.username}
            </li>
          ))}

          {suggestions.length === 0 &&
          friendUsername !== "" &&
          friendUsername !==
            users.filter(
              (filteredUser) => filteredUser.username === friendUsername
            )[0]?.username ? (
            <p>Utilisateur inconnu!</p>
          ) : (
            ""
          )}
        </ul>
      )}
    </>
  );
}
