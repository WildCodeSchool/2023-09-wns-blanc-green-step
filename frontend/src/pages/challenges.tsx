import { ChallengeCard } from "@/components/ChallengeCard";
import { Challenge } from "@/types/challengeType.type";
import { gql, useQuery } from "@apollo/client";
import { useState } from "react";

const GET_ALL_CHALLENGES = gql`
  query GetChallenges {
    getChallenges {
      carbon_saving
      description
      id
      image
      name
    }
  }
`;

const Challenges = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);

  const { loading, error } = useQuery(GET_ALL_CHALLENGES, {
    onCompleted: (data: any) => {
      setChallenges(data.getChallenges);
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <div className="flex flex-col items-center">
      <h1 className="mx-auto mt-4 font-bold italic text-xl sm:text-4xl text-center mb-12 relative sm:w-fit after:absolute after:w-full after:inset-x-0 after:bottom-[-8px] after:scale-x-105 sm:after:bottom-[-5px] after:h-5 after:bg-secondary-10 z-[1] after:z-[-1]">
        Les éco-challenges
      </h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3">
        {challenges.map((challenge, i) => (
          <div key={i}>
            <ChallengeCard
              id={challenge.id}
              image={challenge.image}
              name={challenge.name}
              description={challenge.description}
              carbon_saving={challenge.carbon_saving}
              challenges={challenges}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Challenges;
