import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { FriendCard } from "@/components/friendlist/FriendCard";

describe("Testing friend card", () => {
  it("render the card with username as intended", () => {
    render(
      <FriendCard
        friend={{
          id: 2,
          username: "Jean-Jacques",
          avatar: "/images/blank-avatar.png",
        }}
      />
    );

    const paragraph = screen.getByText("Jean-Jacques");
    expect(paragraph).toBeInTheDocument();
    expect(paragraph).toHaveTextContent("Jean-Jacques");
  });

  it("render the card with username reduced to 9characters + ... if username too long", () => {
    render(
      <FriendCard
        friend={{
          id: 5,
          username: "Jean-Bertrand",
          avatar: "/images/blank-avatar.png",
        }}
      />
    );

    const paragraph = screen.getByText("Jean-Bert...");
    expect(paragraph).toBeInTheDocument();
    expect(paragraph).toHaveTextContent("Jean-Bert...");
  });
});
