import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import FriendRequestCard from "@/components/friendlist/FriendRequestCard";

import { MockedProvider } from "@apollo/client/testing";

const useRouter = jest.spyOn(require("next/router"), "useRouter");
export function mockNextUseRouter(pathname: string) {
  useRouter.mockImplementation(() => ({
    route: "",
    basePath: "",
    pathname,
    query: {},
    asPath: "",
    push: async () => true,
    replace: async () => true,
    reload: () => null,
    back: () => null,
    prefetch: async () => undefined,
    beforePopState: () => null,
    isFallback: false,
    events: {
      on: () => null,
      off: () => null,
      emit: () => null,
    },
  }));
}

describe("Testing Friend Request Card", () => {
  mockNextUseRouter("/");
  it("render the card with friend request infos as intended", () => {
    render(
      <MockedProvider>
        <FriendRequestCard
          friend={{
            id: 2,
            username: "Jean-Jacques",
            image: "/images/blank-avatar.png",
            request_id: 1,
            is_accepted: false,
            is_requested_by_user: false,
          }}
          isFirstTabOpen={true}
          lastRequest={1}
          filterArrayOnDelete={() => null}
        />
      </MockedProvider>
    );

    const [avatar] = screen.getAllByRole("img");
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute("src", "/images/blank-avatar.png");
    expect(avatar).toHaveAttribute("alt", "Jean-Jacques avatar");

    const paragraph = screen.getByText("Jean-Jacques");
    expect(paragraph).toBeInTheDocument();
    expect(paragraph).toHaveTextContent("Jean-Jacques");
  });

  it("render the card with proper icons if is a received request", () => {
    render(
      <MockedProvider>
        <FriendRequestCard
          friend={{
            id: 2,
            username: "Jean-Jacques",
            image: "/images/blank-avatar.png",
            request_id: 1,
            is_accepted: false,
            is_requested_by_user: false,
          }}
          isFirstTabOpen={true}
          lastRequest={1}
          filterArrayOnDelete={() => null}
        />
      </MockedProvider>
    );

    const [_, acceptIcon, refuseIcon] = screen.getAllByRole("img");
    expect(acceptIcon).toBeInTheDocument();
    expect(acceptIcon).toHaveAttribute("alt", "Accept Jean-Jacques Icon");

    expect(refuseIcon).toBeInTheDocument();
    expect(refuseIcon).toHaveAttribute("alt", "Refuse Jean-Jacques Icon");
  });

  it("render the card with proper icons if is a sent request", () => {
    render(
      <MockedProvider>
        <FriendRequestCard
          friend={{
            id: 2,
            username: "Jean-Jacques",
            image: "/images/blank-avatar.png",
            request_id: 1,
            is_accepted: false,
            is_requested_by_user: true,
          }}
          isFirstTabOpen={false}
          lastRequest={1}
          filterArrayOnDelete={() => null}
        />
      </MockedProvider>
    );

    const [_, deleteIcon] = screen.getAllByRole("img");

    expect(deleteIcon).toBeInTheDocument();
    expect(deleteIcon).toHaveAttribute(
      "alt",
      "Delete Request for Jean-Jacques Icon"
    );
  });
});
