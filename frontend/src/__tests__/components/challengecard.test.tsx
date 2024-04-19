import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ChallengeCard } from "@/components/ChallengeCard";

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

describe("Testing challenge card", () => {
  it("render the challenge card component and check the title, picture and button", () => {
    mockNextUseRouter("/");
    render(
      <ChallengeCard
        name="écochallenge"
        image="https://www.aquaportail.com/pictures2010/ecologie-globale.jpg"
        id={1}
        description="blabla"
        carbon_saving={1}
        challenges={[]}
      />
    );

    const heading = screen.getByRole("heading", { level: 2 });

    expect(heading).toHaveTextContent("écochallenge");

    const image = screen.getByRole("img");

    expect(image).toHaveAttribute(
      "src",
      "https://www.aquaportail.com/pictures2010/ecologie-globale.jpg"
    );

    const button = screen.getByRole("button");

    expect(button.textContent).toBe("Accéder au challenge");
  });
});
