import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "@/components/Button";

describe("Testing button component", () => {
  it("render the button component and check the color, text-size and content", () => {
    const click = jest.fn();
    render(
      <Button
        color="bg-green-50"
        textsize="text-sm"
        content="button"
        onClick={click}
      />
    );

    const button = screen.getByRole("button");

    expect(button).toHaveTextContent("button");
    expect(button).toHaveClass("bg-green-50 text-sm");

    fireEvent.click(button);
    expect(click).toHaveBeenCalled();
  });
});
