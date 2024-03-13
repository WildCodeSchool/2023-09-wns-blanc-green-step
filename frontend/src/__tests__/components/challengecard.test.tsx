import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ChallengeCard } from "@/components/ChallengeCard";

describe("Testing challenge card", () => {
  it("render the challenge card component and check the title, picture and button", () => {
    render(
      <ChallengeCard
        name="écochallenge"
        image="https://www.aquaportail.com/pictures2010/ecologie-globale.jpg"
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
