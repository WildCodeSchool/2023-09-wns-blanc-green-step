import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ExpenseElement from "@/components/dashboard/ExpenseElement";

describe("Testing expense element component", () => {
  it("render the component with a title, transport type, emission a date and a picture", () => {
    render(
      <ExpenseElement
        expense={{
          id: 1,
          title: "Titre Super",
          date: "12/02/2024",
          emission: 50,
          carbon_saving: 60,
        }}
      />
    );

    const title = screen.getByText("Titre Super");
    const transport = screen.getByText("Transports");
    const emission = screen.getByText("50");
    const date = screen.getByText("12/02/2024");
    const img = screen.getByRole("img");

    expect(title).toBeInTheDocument();
    expect(transport).toBeInTheDocument();
    expect(emission).toBeInTheDocument();
    expect(date).toBeInTheDocument();
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "/images/edit-button.png");
    expect(img).toHaveAttribute("alt", "Edit Expense Titre Super Button");
  });
});
