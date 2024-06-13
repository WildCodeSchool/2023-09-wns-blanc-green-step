import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ExpenseCard from '@/components/dashboard/ExpenseCard';
import { Expense } from '@/types/expense.type';


// Mocking the ModalUpdateCarbonExpense component
jest.mock('../../components/dashboard/ModalUpdateCarbonExpense', () => ({
  __esModule: true,
  default: ({ isOpen, onClose, expense }: { isOpen: boolean; onClose: () => void; expense: Expense }) => {
    return isOpen ? (
      <div data-testid="modal">
        <button onClick={onClose} data-testid="trash-btn">Trash Button</button>
        Modal Content
      </div>
    ) : null;
  },
}));

const mockExpense: Expense = {
  id: 1,
  title: "Test Expense",
  activityType: { id: 1, name: "Test Activity", icon: "/test-icon.png"},
  emission: 10,
  date: "2023-01-01T00:00:00Z",
};


describe('ExpenseCard', () => {
  test('displays the modal when the button is clicked and hides when the trash button is clicked', () => {
    render(
      <ExpenseCard
        expense={mockExpense}
        isOpen={true}
        handleMobileExpenseCardOpen={() => {}}
      />
    );


    // Vérifie que la modale n'est pas visible au début
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();

    // Clique sur le bouton pour ouvrir la modale
    fireEvent.click(screen.getByRole('button', { name: /Edit Expense Test Expense Button/i }));

    // Vérifie que la modale est visible après le clic
    expect(screen.getByTestId('modal')).toBeInTheDocument();

    // Click the trash button to close the modal
    fireEvent.click(screen.getByTestId('trash-btn'));

    // Verify that the modal is not visible after clicking the trash button
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });
});