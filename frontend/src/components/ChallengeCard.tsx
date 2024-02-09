import { Button } from "./Button";

export type ChallengeCardProps = {
  name: string;
  image: string;
};

export const ChallengeCard = ({ name, image }: ChallengeCardProps) => {
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
            />
          </div>
        </div>
      </div>
    </>
  );
};
