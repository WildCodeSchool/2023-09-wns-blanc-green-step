import { useState } from "react";
import { Button } from "./Button";
import { ModalChallenge } from './ModalChallenge';

export type ChallengeCardProps = {
  name: string;
  image: string;
  description: string;
  carbon_saving: number;
};

export const ChallengeCard = ({ name, image, description, carbon_saving}: ChallengeCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  }

  return (
    <>
      <div className="m-4 w-64 bg-green-100 shadow-xl p-4 rounded-lg flex flex-col justify-center">
        <img src={image} alt="image du challenge correspondant" />
        <div>
          <h2 className="py-2">{name}</h2>
          <div className="flex justify-end">
            <Button
              color="bg-green-50"
              textsize="text-sm"
              content="Accéder au challenge"
              onClick={handleOpenModal}
            />
          </div>
        </div>
      </div>
      <ModalChallenge 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        challenge={{name, image, description, carbon_saving}}
      />
    </>
  );
};
