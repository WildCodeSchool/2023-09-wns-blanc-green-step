import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
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

describe("Testing Navigation Dashboard", () => {
  mockNextUseRouter("/");
  it("render the navboard with four links", () => {
    render(<NavBoard />);

    const [homeLink, myExpenses, MyEcochallenges, disconnect] = screen.getAllByRole("link");
    const [homeLink, carbonFootprint,myExpenses, disconnect] = screen.getAllByRole("link");

    expect(homeLink).toHaveAttribute("href", "/");
    expect(carbonFootprint).toHaveAttribute("href", "/mon-bilan-carbone");
    expect(myExpenses).toHaveAttribute("href", "/my-expenses");
    expect(MyEcochallenges).toHaveAttribute("href", "/my-ecochallenges");
    expect(disconnect).toHaveAttribute("href", "/");
  });

  it("render the navboard with a burger icon with hidden class and an avatar", () => {
    render(<NavBoard />);

    const [burgerIcon, _, avatar] = screen.getAllByRole("img");

    expect(burgerIcon).toHaveAttribute("src", "/images/burger-icon.png");
    expect(burgerIcon).toHaveAttribute("alt", "Burger Menu Icon");
    expect(burgerIcon).toHaveClass("sm:hidden");

    expect(avatar).toHaveAttribute("src", "/images/blank-avatar.png");
    expect(avatar).toHaveAttribute("alt", "blank avatar");
  });
});
