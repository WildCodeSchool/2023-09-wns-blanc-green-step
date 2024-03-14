import { useEffect } from "react";
import { Button } from "./Button";

interface ModalChallengeProps {
  isOpen: boolean;
  onClose: () => void;
  challenge: {
    description: string;
    image: string;
    name: string;
    carbon_saving: number;
  };
}


export const ModalChallenge = ({ isOpen, onClose, challenge }: ModalChallengeProps) => {
    useEffect(() => {
        if (isOpen) {
          // Ajoute la classe overflow-hidden au body
          document.body.classList.add('overflow-hidden');
        }
    
        // Nettoyage en retirant la classe lorsque le composant est démonté ou si le modal se ferme
        return () => document.body.classList.remove('overflow-hidden');
      }, [isOpen]); // Exécute cet effet seulement lorsque la valeur de isOpen change

    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center backdrop-blur-[10px] z-[7]">
        <div className="relative  w-1/2 shadow-lg rounded-md bg-green-100 p-6">
          {/* Contenu du Modal */}
          <div className="flex flex-col items-center ">
            {/* Nom du Challenge */}
            <h3 className="text-lg font-medium mb-4">{challenge.name}</h3>
  
            {/* Image */}
            <img className="w-64 h-64 object-cover mb-4 shadow-xl" src={challenge.image} alt="Challenge" />
  
            {/* Description et Carbon Saving à côté de l'image */}
            <div className="flex flex-col justify-between items-center w-full mb-4">
              <p className="text-sm">{challenge.description}</p>
              <p className="text-sm mt-5">Carbone sauvé : {challenge.carbon_saving}</p>
            </div>
  
            <Button 
            color="bg-blue-40"
            textsize="text-sm"
            content="Fermer"
            onClick={onClose}/>
          </div>
        </div>
      </div>
    );
  };
  