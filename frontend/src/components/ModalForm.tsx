import React from "react";
import styles from '../styles/addExpense.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function ModalForm({ isOpen, onClose, children }: ModalProps) {
  const handleClose = () => {
    onClose();
  };

  return (
    <dialog open={isOpen} className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
        <span
          onClick={handleClose}
          className={styles.closeModal}
        >
          &times;
        </span>
          <h2 className="font-poppins">
            Balance ta dépense
          </h2>
        </div>
        <div className={styles.modalBody}>
          <form>
            <div className="mb-4">
              <label className="font-poppins" htmlFor="title">
                Titre :
              </label>
              <input type="text" id="title" name="title" className="input" />
            </div>
            <div className="mb-4">
              <label className="font-poppins" htmlFor="date">
                Date :
              </label>
              <input type="date" id="date" name="date" className="input " />
            </div>
            <div className="mb-4">
              <label className="font-poppins" htmlFor="emission">
                Émission :
              </label>
              <input
                type="integer"
                id="emission"
                name="emission"
                className="input"
              />
            </div>
            <button type="submit" className="btn bg-blue-70 hover:bg-blue-50 font-poppins py-2 px-4 my-2 mx-4 rounded-full">
              soumettre la dépense
            </button>
          </form>
        </div>
        {children}
      </div>
    </dialog>
  );
}
