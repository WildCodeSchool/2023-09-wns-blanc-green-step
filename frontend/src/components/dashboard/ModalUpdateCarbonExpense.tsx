import "react-toastify/dist/ReactToastify.css";
import styles from "@/styles/updateExpense.module.css";
import { ActivityType } from "@/types/activityType.type";
import { useRouter } from "next/router";
import { gql, useMutation, useQuery } from "@apollo/client";
import React, { FormEvent, useState } from "react";
import { Expense } from "@/types/expense.type";

interface ModalProps {
  isOpen: boolean;
  expense: Expense;
  onClose: () => void;
}

const GET_ALL_ACTIVITIESTYPES = gql`
  query Query {
    getActivityTypes {
      id
      name
      icon
      carbon_emission
    }
  }
`;

const UPDATE_CARBON_EXPENSE = gql`
  mutation Mutation($expense: UpdateCarbonExpenseType!) {
    updateCarbonExpense(expense: $expense) {
      id
      title
      date
      emission
      activityType {
        id
      }
    }
  }
`;

export const DELETE_CARBONEEXPENSE = gql`
  mutation DeleteCarboneExpense($deleteCarboneExpenseId: Float!) {
    DeleteCarboneExpense(id: $deleteCarboneExpenseId)
  }
`;

export default function ModalUpdateCarbonExpense({
  expense,
  isOpen,
  onClose,
}: ModalProps) {
  // Utile pour la redirection
  const router = useRouter();

  // State qui va autorier l'affichage du bouton de soumission
  const [isActivate, setIsActivate] = useState(false);

  // State for Picture in Select Option
  const [selectImg, setSelectImg] = useState<{ icon: string; name: string }>({
    icon: "",
    name: "",
  });

  // Requête gql
  const { data } = useQuery(GET_ALL_ACTIVITIESTYPES, {
    onCompleted: (data: any) => {
      setSelectImg(data.getActivityTypes[0]);
    },
  });

  const formatDate = expense.date.substring(0, 10);

  const [updateCarboneExpense] = useMutation(UPDATE_CARBON_EXPENSE);

  // Etat qui va enregistrer les valeurs des différents champs du form
  const [dataForm, setDataForm] = useState({
    title: expense.title,
    date: expense.date,
    emission: expense.emission,
  });

  // Fonction qui gère les changements des champs
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDataForm({
      ...dataForm,
      [name]: name.startsWith("number")
        ? value === ""
          ? null
          : parseFloat(value)
        : value,
    });
  };

  // Vérifie si les données entrées sont conformes
  const checkForm = () => {
    const { title, date, emission } = dataForm;
    if (title.trim() !== "" && !isNaN(Date.parse(date)) && emission !== null) {
      setIsActivate(true);
    } else {
      setIsActivate(false);
    }
  };

  // Vérification si empty et type
  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(event);
    checkForm();
  };

  // Fonction qui permet de fermer la modal
  const handleClose = () => {
    onClose();
  };

  const [deleteExpenseRequest] = useMutation(DELETE_CARBONEEXPENSE);

  const deleteExpense = async () => {
    deleteExpenseRequest({
      variables: {
        deleteCarboneExpenseId: expense.id,
      },
      onCompleted: () => {
        onClose();
      }
    });
  };

  // Création de la dépense carbon et redirection
  const submit = async (event: FormEvent) => {
    event.preventDefault();

    const form: EventTarget = event.target;
    const formData = new FormData(form as HTMLFormElement);
    const formDataJson = Object.fromEntries(formData.entries());

    updateCarboneExpense({
      variables: {
        expense: {
          id: expense.id,
          title: formDataJson.title,
          date: formDataJson.date,
          emission: parseInt(formDataJson.emission as string),
          activityType: parseInt(formDataJson.activityType as string),
        },
      },
      onCompleted: () => {
        onClose();
        window.location.reload();
      },
    });
  };

  return (
    <dialog open={isOpen} className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <button onClick={deleteExpense} data-testid="trash-btn">
            <img src="/images/trash-btn.png" />
          </button>
          <span onClick={handleClose} className={styles.closeModal}>
            &times;
          </span>
        </div>
        <div className={styles.modalTitle}>
          <h2 className="font-poppins">Édition de dépense</h2>
        </div>
        <div className={styles.modalBody}>
          <form onSubmit={submit}>
            <div className="contents mb-4">
              <label className="font-poppins" htmlFor="title">
                Titre :
              </label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder={expense.title}
                value={dataForm.title}
                onChange={handleFormChange}
                className="input"
                required
              />
            </div>
            <div className="contents mb-4">
              <label className="font-poppins" htmlFor="date">
                Ancienne date : {formatDate}
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={dataForm.date}
                onChange={handleFormChange}
                className="input"
                required
              />
            </div>
            <div className="contents mb-4">
              <label className="font-poppins" htmlFor="emission">
                Émission :
              </label>
              <input
                type="number"
                id="emission"
                name="emission"
                placeholder={`${expense.emission}`}
                value={dataForm.emission === null ? "" : dataForm.emission}
                onChange={handleFormChange}
                className="input"
                required
              />
            </div>
            <div className="flex justify-center">
              <select
                name="activityType"
                className="input mb-4 p-2 pl-12"
                onChange={(e) =>
                  setSelectImg(
                    data.getActivityTypes[parseInt(e.target.value, 10) - 1]
                  )
                }
              >
                {data?.getActivityTypes.map((activityType: ActivityType) => (
                  <option key={activityType.id} value={activityType.id}>
                    {activityType.name}
                  </option>
                ))}
              </select>
              <img
                src={selectImg.icon}
                className="absolute h-[35px] w-[35px] left-[28%] max-sm:left-[26%] translate-y-[2px]"
                alt={selectImg.name}
              />
            </div>
            {isActivate ? (
              <button
                type="submit"
                disabled={!isActivate}
                className="btn bg-blue-70 hover:bg-blue-50 font-poppins py-2 px-4 my-2 mx-4 rounded-full"
              >
                Éditer la dépense
              </button>
            ) : null}
          </form>
        </div>
      </div>
    </dialog>
  );
}
