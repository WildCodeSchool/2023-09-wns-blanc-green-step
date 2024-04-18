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
  it("render the navboard with three links", () => {
    render(<NavBoard />);

    const [homeLink, myExpenses, profil, disconnect] = screen.getAllByRole("link");

    expect(homeLink).toHaveAttribute("href", "/");
    expect(myExpenses).toHaveAttribute("href", "/my-expenses");
    expect(profil).toHaveAttribute("href", "/profil");
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
