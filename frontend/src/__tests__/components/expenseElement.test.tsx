import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ExpenseElement from "@/components/dashboard/ExpenseElement";

describe("Testing expense element component", () => {
  it("render the component with a title, transport type, emission a date and a picture", () => {
    const expense = {
      activityType: {
        id: 1,
        name: "Transport",
        icon: "/images/transport.png",
      },
      id: 1,
      title: "Titre Super",
      date: "12/02/2024",
      emission: 50,
    };

    render(<ExpenseElement expense={expense} />);

    // const title = screen.getByText("Titre Super");
    const transport = screen.getByText("Type d'activité: Transport");
    const emission = screen.getByText("Tonnes CO2 eq: 50");
    const date = screen.getByText("Date: 12/02/2024");
    const [openDots, icon, editButton] = screen.getAllByRole("img");

    // expect(title).toBeInTheDocument();
    expect(transport).toBeInTheDocument();
    expect(emission).toBeInTheDocument();
    expect(date).toBeInTheDocument();

    expect(openDots).toBeInTheDocument();
    expect(openDots).toHaveAttribute("src", "/images/expense-dots.png");
    expect(openDots).toHaveAttribute("alt", `Open ${expense.title} Button`);

    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("src", expense.activityType.icon);
    expect(icon).toHaveAttribute("alt", expense.activityType.name);

    expect(editButton).toBeInTheDocument();
    expect(editButton).toHaveAttribute("src", "/images/edit-button.png");
    expect(editButton).toHaveAttribute(
      "alt",
      `Edit Expense ${expense.title} Button`
    );
  });
});
