// src/contexts/ExpensesContext.tsx

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { AuthContext } from "@/contexts/AuthContext";

const GET_USER_EXPENSES = gql`
  query GetUserCarbonExpenses($userId: Float!) {
    getUserCarbonExpenses(userId: $userId) {
      activityType {
        id
        name
        icon
      }
      date
      emission
      id
      title
    }
  }
`;

const CREATE_CARBONEXPENSE = gql`
  mutation Mutation($expense: CreateCarbonExpenseType!) {
    createCarbonExpense(expense: $expense) {
      title
      date
      emission
    }
  }
`;

const DELETE_CARBONEXPENSE = gql`
  mutation DeleteCarboneExpense($deleteCarboneExpenseId: Float!) {
    DeleteCarboneExpense(id: $deleteCarboneExpenseId)
  }
`;

interface Expense {
  id: number;
  title: string;
  date: string;
  emission: number;
  activityType: {
    id: number;
    name: string;
    icon: string;
  };
}

interface ExpensesContextType {
  expenses: Expense[];
  addExpense: (expense: any) => void;
  deleteExpense: (id: number) => void;
  refetchExpenses: () => void;
}

const ExpensesContext = createContext<ExpensesContextType | undefined>(
  undefined
);

export const ExpensesProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useContext(AuthContext);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const { data, refetch } = useQuery(GET_USER_EXPENSES, {
    variables: { userId: Number(user.id) },
    skip: !user.id,
  });

  const [createCarboneExpense] = useMutation(CREATE_CARBONEXPENSE, {
    onCompleted: () => {
      refetch();
    },
  });

  const [deleteCarboneExpense] = useMutation(DELETE_CARBONEXPENSE, {
    onCompleted: () => {
      refetchExpenses();
    },
  });

  useEffect(() => {
    if (data) {
      setExpenses(data.getUserCarbonExpenses);
    }
  }, [data]);

  const addExpense = (expense: any) => {
    createCarboneExpense({
      variables: { expense },
    });
  };

  const deleteExpense = (id: number) => {
    deleteCarboneExpense({
      variables: { deleteCarboneExpenseId: id },
    });
  };

  const refetchExpenses = () => {
    refetch();
  };

  return (
    <ExpensesContext.Provider
      value={{ expenses, addExpense, deleteExpense, refetchExpenses }}
    >
      {children}
    </ExpensesContext.Provider>
  );
};

export const useExpenses = () => {
  const context = useContext(ExpensesContext);
  if (!context) {
    throw new Error("useExpenses must be used within an ExpensesProvider");
  }
  return context;
};
