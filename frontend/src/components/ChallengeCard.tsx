import { Button } from "./Button";

export const ChallengeCard = () => {
  return (
    <>
      <div className="mx-auto w-44 bg-green-100 shadow-xl p-4 rounded-lg flex flex-col justify-center">
        <img
          src="https://img.freepik.com/vecteurs-libre/sauvez-concept-planete-gens-qui-prennent-soin-terre_23-2148522570.jpg?w=1060&t=st=1707296087~exp=1707296687~hmac=f1bd2b58582716a26548311f6d4638f387468263e13b1c25368620389049d005"
          alt="Shoes"
        />
        <div className="">
          <h2 className="py-2">Challenge</h2>
          <div className="flex justify-end">
            <Button color="bg-green-50" textsize="text-sm" content="Accéder au challenge" />
          </div>
        </div>
      </div>
    </>
  );
};
