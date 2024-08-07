import styles from "../styles/addExpense.module.css";
import { ActivityType } from "@/types/activityType.type";
import { gql, useQuery } from "@apollo/client";
import React, { FormEvent, useState } from "react";
import { useExpenses } from "@/contexts/ExpensesContext";

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

export default function ModalForm({ isOpen, onClose }: ModalProps) {
  const { addExpense } = useExpenses();

  // State qui va autorier l'affichage du bouton de soumission
  const [isActivate, setIsActivate] = useState(false);

  // State for Picture in Select Option
  const [selectImg, setSelectImg] = useState<{ icon: string; name: string }>({
    icon: "",
    name: "",
  });

  // State pour les messages d'erreur
  const [errorMessages, setErrorMessages] = useState({
    title: "",
    date: "",
    emission: "",
  });

  // Requête gql
  const { data } = useQuery(GET_ALL_ACTIVITIESTYPES, {
    onCompleted: (data: any) => {
      setSelectImg(data.getActivityTypes[0]);
    },
  });

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

  // Vérifie si les données entrées sont conformes et met à jour les messages d'erreur
  const checkForm = () => {
    const { title, date, emission } = dataForm;
    let valid = true;
    const errors = { title: "", date: "", emission: "" };

    if (title.trim() === "") {
      errors.title = "Le titre est requis.";
      valid = false;
    }

    if (title.length >= 20) {
      errors.title = "La longueur maximale est de 20 lettres."
    }

    if (isNaN(Date.parse(date))) {
      errors.date = "La date est requis.";
      valid = false;
    }

    if (emission === null) {
      errors.emission = "L'emission est requise.";
      valid = false;
    }

    setErrorMessages(errors);
    setIsActivate(valid);
    return valid;
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
    const isValid = checkForm();

    if (!isValid) {
      return;
    }

    const form: EventTarget = event.target;
    const formData = new FormData(form as HTMLFormElement);
    const formDataJson = Object.fromEntries(formData.entries());

    addExpense({
      title: formDataJson.title as string,
      date: formDataJson.date as string,
      emission: parseInt(formDataJson.emission as string),
      activityType: parseInt(formDataJson.activityType as string),
    });

    onClose();
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
              />
              {errorMessages.title && <p className="text-red-50">{errorMessages.title}</p>}
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
              />
              {errorMessages.date && <p className="text-red-50">{errorMessages.date}</p>}
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
              />
              {errorMessages.emission && <p className="text-red-50">{errorMessages.emission}</p>}
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
            <button
              type="submit"
              className={`btn bg-blue-70 hover:bg-blue-50 font-poppins py-2 px-4 my-2 mx-4 rounded-full`}
            >
              soumettre la dépense
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
