import { useEffect, useState } from "react";
import { Button } from "./Button";
import { Challenge } from "@/types/challengeType.type";
import { useRouter } from "next/router";

interface ModalChallengeProps {
  isOpen: boolean;
  onClose: () => void;
  challenge: Challenge;
  allChallenges: Challenge[];
}

export const ModalChallenge = ({ isOpen, onClose, challenge, allChallenges }: ModalChallengeProps) => {
  const [currentIndex, setCurrentIndex] = useState(allChallenges.findIndex(c => c.id === challenge.id));
  const [currentChallenge, setCurrentChallenge] = useState<Challenge>(allChallenges[currentIndex]);
  const router = useRouter();

  // Mettre à jour setCurrentChallenge pour utiliser currentIndex et changer le challenge sélectionné
  useEffect(() => {
    setCurrentChallenge(allChallenges[currentIndex]);
  }, [currentIndex]);

  // Modifier handlePrevious et handleNext pour gérer correctement les limites du tableau AllChallenges
  const handlePrevious = () => {
    setCurrentIndex(prevIndex => prevIndex - 1 < 0 ? allChallenges.length - 1 : prevIndex - 1);
  };

  const handleNext = () => {
    setCurrentIndex(nextIndex => (nextIndex + 1) % allChallenges.length);
  };

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
    <div className="fixed inset-0 bg-gray-50 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center backdrop-blur-[10px] z-[7]">
      <div className="relative w-[75%] shadow-lg rounded-md bg-green-100 p-6 sm:w-1/2">
        {/* Contenu du Modal */}
        <div className="flex flex-col items-center ">
          {/* Nom du Challenge */}
          <h3 className="text-lg font-medium mb-4">{currentChallenge.name}</h3>

          {/* Image */}
          <img className="w-64 h-64 object-cover mb-4 shadow-xl" src={currentChallenge.image} alt="Challenge" />

          {/* Description et Carbon Saving à côté de l'image */}
          <div className="flex flex-col justify-between items-center w-full mb-4">
            <p className="text-sm">{currentChallenge.description}</p>
            <p className="text-sm mt-5">Carbone sauvé : {currentChallenge.carbon_saving}</p>
          </div>

          <Button
            color="bg-blue-40"
            textsize="text-sm"
            content="Fermer"
            onClick={onClose} />
        </div>
      </div>
      {
        router.pathname === '/challenges' && (
          <>
            <button className="absolute left-[20px] top-[50%] text-2xl sm:text-4xl" onClick={handlePrevious}>←</button>
            <button className="absolute right-[20px] top-[50%] text-2xl sm:text-4xl" onClick={handleNext}>→</button>
          </>
        )
      }

    </div>
  );
};
