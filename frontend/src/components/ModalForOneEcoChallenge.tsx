import { useEffect } from "react";
import { Button } from "./Button";
import { Challenge } from "@/types/challengeType.type";
import GlobalStyle from "@/styles/GlobalStyle";

interface ModalChallengeProps {
  isOpen: boolean;
  onClose: () => void;
  challenge: Challenge;
}

export const ModalForOneEcoChallenge = ({
  isOpen,
  onClose,
  challenge,
}: ModalChallengeProps) => {
  if (!isOpen) return null; // Ne rend rien si le modal n'est pas ouvert

  return (
    <>
      <GlobalStyle overflowHidden={isOpen} />
      <div className="fixed inset-0 bg-gray-50 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center backdrop-blur-[10px] z-[7]">
        <div className="relative w-[75%] shadow-lg rounded-md bg-green-100 p-6 sm:w-1/2">
          {/* Contenu du Modal */}
          <div className="flex flex-col items-center ">
            {/* Nom du Challenge */}
            <h3 className="text-lg font-medium mb-4">{challenge.name}</h3>

            {/* Image */}
            <img
              className="w-64 h-64 object-cover mb-4 shadow-xl"
              src={challenge.image}
              alt="Challenge"
            />

            {/* Description et Carbon Saving à côté de l'image */}
            <div className="flex flex-col justify-between items-center w-full mb-4">
              <p className="text-sm">{challenge.description}</p>
              <p className="text-sm mt-5">
                Carbone sauvé : {challenge.carbon_saving}
              </p>
            </div>

            <Button
              color="bg-blue-40"
              textsize="text-sm"
              content="Fermer"
              onClick={onClose}
            />
          </div>
        </div>
      </div>
    </>
  );
};
