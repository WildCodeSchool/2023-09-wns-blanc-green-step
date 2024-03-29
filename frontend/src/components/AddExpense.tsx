import { useState } from "react";
import ModalForm from "./ModalForm";

export default function AddExpense() {
  const [isPopUp, setIsPopUp] = useState(false);

  const openModal = () => {
    setIsPopUp(true);
  };
  const closeModal = () => {
    setIsPopUp(false);
  };

  return (
    <>
      <div className="flex justify-center fixed bottom-8 right-8 z-10">
        <button
          type="button"
          onClick={openModal}
          className="bg-blue-70 hover:bg-blue-50 font-poppins py-2 px-4 my-2 mx-4 rounded-full"
        >
          + CO²
        </button>
        <div className="flex justify-center">
          {isPopUp ? (
            <ModalForm isOpen={isPopUp} onClose={closeModal}></ModalForm>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
