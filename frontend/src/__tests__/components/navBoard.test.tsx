import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import NavBoard from "@/components/dashboard/NavBoard";

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

const localStorageMock = (function () {
  const store: any = {
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzIxNzU3MTc1LCJleHAiOjk5OTk5OTk5OTl9.GNxCYsmFsqaJh0K7YCU8F8bkk_uSb9oW1WGIr4EOFh4",
  };

  return {
    getItem: function (key: string) {
      return store[key] || null;
    },
    removeItem: function (key: string) {
      return (store[key] = "");
    },
  };
})();

describe("Testing Navigation Dashboard", () => {
  mockNextUseRouter("/");
  Object.defineProperty(window, "localStorage", {
    value: localStorageMock,
  });

  it("render the navboard with four links", () => {
    render(<NavBoard />);

    const [
      homeLink,
      carbonFootprint,
      myExpenses,
      MyEcochallenges,
      friends,
      profil,
      disconnect,
    ] = screen.getAllByRole("link");

    expect(homeLink).toHaveAttribute("href", "/");
    expect(carbonFootprint).toHaveAttribute("href", "/mon-bilan-carbone");
    expect(myExpenses).toHaveAttribute("href", "/my-expenses");
    expect(MyEcochallenges).toHaveAttribute("href", "/my-ecochallenges");
    expect(friends).toHaveAttribute("href", "/friends");
    expect(profil).toHaveAttribute("href", "/profil");
    expect(disconnect).toHaveAttribute("href", "/");
  });

  it("render the navboard with a burger icon with hidden class and an avatar", () => {
    render(<NavBoard />);

    const [burgerIcon, _, avatar] = screen.getAllByRole("img");

    expect(burgerIcon).toHaveAttribute("src", "/images/burger-icon.png");
    expect(burgerIcon).toHaveAttribute("alt", "Burger Menu Icon");
    expect(burgerIcon).toHaveClass("lg:hidden");

    expect(avatar).toHaveAttribute("src", "/images/blank-avatar.png");
    expect(avatar).toHaveAttribute("alt", " avatar");
  });
});
