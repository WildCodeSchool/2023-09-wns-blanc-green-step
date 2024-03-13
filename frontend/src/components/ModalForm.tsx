import "react-toastify/dist/ReactToastify.css";
import styles from "../styles/addExpense.module.css";
import { ActivityType } from "@/types/activityType.type";
import { useRouter } from "next/router";
import { gql, useMutation, useQuery } from "@apollo/client";
import React, { FormEvent, useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";

interface ModalProps {
  isOpen: boolean;
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

const CREATE_CARBONEXPENSE = gql`
  mutation Mutation($expense: CreateCarbonExpenseType!) {
    createCarbonExpense(expense: $expense) {
      title
      date
      emission
    }
  }
`;

export default function ModalForm({ isOpen, onClose }: ModalProps) {
  // Utile pour la redirection
  const router = useRouter();

  // State qui va autorier l'affichage du bouton de soumission
  const [isActivate, setIsActivate] = useState(false);

  // Requête gql
  const { data } = useQuery(GET_ALL_ACTIVITIESTYPES);
  const [createCarboneExpense] = useMutation(CREATE_CARBONEXPENSE);

  interface translateHexInEmojiProps {
    hexaCode: string;
  }
  function TranslateHexInEmoji(props: translateHexInEmojiProps) {
    const { hexaCode } = props;
    const decimalCode = parseInt(hexaCode, 16);
    const emoji = String.fromCharCode(decimalCode);

    return <span> { emoji } </span>
  }

  // Etat qui va enregistrer les valeurs des différents champs du form
  const [dataForm, setDataForm] = useState({
    title: "",
    date: "",
    emission: null as unknown as number,
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
    if (
      title.trim() !== "" &&
      !isNaN(Date.parse(date)) &&
      emission !== null
    ) {
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
  
  // Création de la dépense carbon et redirection
  const submit = async (event: FormEvent) => {
    event.preventDefault();

    const form: EventTarget = event.target;
    const formData = new FormData(form as HTMLFormElement);
    const formDataJson = Object.fromEntries(formData.entries());

    createCarboneExpense({
      variables: {
        expense: {
          title: formDataJson.title,
          date: formDataJson.date,
          emission: parseInt(formDataJson.emission as string),
          activityType: parseInt(formDataJson.activityType as string)
        },
      },
      onCompleted: () => {
        onClose();
        router.push("/my-expenses");
      },
    });
  };

  return (
    <dialog open={isOpen} className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <span onClick={handleClose} className={styles.closeModal}>
            &times;
          </span>
          <h2 className="font-poppins">Balance ta dépense</h2>
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
                value={dataForm.title}
                onChange={handleFormChange}
                className="input"
                required
              />
            </div>
            <div className="contents mb-4">
              <label className="font-poppins" htmlFor="date">
                Date :
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
                value={dataForm.emission === null ? "" : dataForm.emission}
                onChange={handleFormChange}
                className="input"
                required
              />
            </div>
            <div className="flex justify-center">
              <select
              name="activityType"
              className="input mb-4 p-2">
                {data?.getActivityTypes.map((activityType: ActivityType) => (
                  <option key={activityType.id} value={activityType.id}>
                    {activityType.name} 
                    
                    {/*
                    Les icons ne sont pas lisibles sauf pour logement et ça fait buger les tests
                    <TranslateHexInEmoji hexaCode={activityType.icon} /> */}
                  </option>
                ))}
              </select>
            </div>
            {isActivate ? (
              <button
                type="submit"
                disabled={!isActivate}
                className="btn bg-blue-70 hover:bg-blue-50 font-poppins py-2 px-4 my-2 mx-4 rounded-full"
              >
                soumettre la dépense
              </button>
            ) : null}
          </form>
        </div>
      </div>
      {/* <ToastContainer /> */}
    </dialog>
  );
}
