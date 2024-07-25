import React, { ReactNode, createContext, useContext } from "react";
import { toast } from "react-toastify";

type useNotifType = {
  notifAddExpense: () => void;
  notifEditExpense: () => void;
  notifSuppExpense: () => void;
};

const NotifContext = createContext<useNotifType | undefined>(undefined);

  const NotifProvider = ({ children }: { children: ReactNode }) => {
  const notifAddExpense = () => {
    toast.success("Dépense ajoutée !", {
      position: "top-center",
    });
  };

  const notifEditExpense = () => {
    toast.success("Dépense modifiée !", {
      position: "top-center",
    });
  };

  const notifSuppExpense = () => {
    toast.success("Dépense supprimée !", {
      position: "top-center",
    });
  };

  return (
    <NotifContext.Provider
      value={{ notifAddExpense, notifEditExpense, notifSuppExpense }}
    >
      {children}
    </NotifContext.Provider>
  );
};

export { NotifProvider };
export default NotifContext;
