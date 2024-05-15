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

  it("render the card avatar as intended", () => {
    render(
      <FriendCard
        friend={{
          id: 2,
          username: "Jean-Jacques",
          avatar: "/images/blank-avatar.png",
        }}
      />
    );

    const [avatar] = screen.getAllByRole("img");
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute("src", "/images/blank-avatar.png");
    expect(avatar).toHaveAttribute("alt", "Jean-Jacques avatar");
  });

  it("render the card ... img as intended", () => {
    render(
      <FriendCard
        friend={{
          id: 2,
          username: "Jean-Jacques",
          avatar: "/images/blank-avatar.png",
        }}
      />
    );

    const [_, dotImg] = screen.getAllByRole("img");
    expect(dotImg).toBeInTheDocument();
    expect(dotImg).toHaveAttribute("src", "/images/expense-dots.png");
    expect(dotImg).toHaveAttribute("alt", "dot picture button");
  });
});
